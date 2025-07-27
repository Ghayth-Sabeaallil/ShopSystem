import express from 'express';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { ReceiptsModel } from '../models/receipt';
dotenv.config();

const receiptRouter = express.Router();

receiptRouter.post("/add", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const owner_id = decoded.userId;
            const newReceipt = new ReceiptsModel({ ...req.body, owner_id: owner_id });
            await newReceipt.save();
            res.send(newReceipt);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

receiptRouter.get("/getByOwner", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const event = await ReceiptsModel.find({ owner_id: decoded.userId }).exec();
            res.status(200).json(event);
        }
    } catch (err) {
        res.status(500).json({ message: "Error getting user products", err });
    }
});

receiptRouter.put("/update", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            const userId = decoded.userId;
            const { items, barCode } = req.body;

            if (!barCode) {
                res.status(400).json({ message: 'barCode is required.' });
            } else {
                const receipt = await ReceiptsModel.findOne({ bar_code: barCode });

                if (!receipt) {
                    res.status(404).json({ message: 'Receipt not found.' });
                } else {
                    if (receipt.owner_id.toString() !== userId) {
                        res.status(403).json({ message: 'Not authorized to update this product.' });
                    } else {
                        if (Array.isArray(items) && items.length === 0) {
                            await receipt.deleteOne();
                            res.status(200).json(receipt);
                        } else if (Array.isArray(items) && items.length !== 0) {
                            receipt.items = items;
                            receipt.bar_code = barCode;
                            await receipt.save();
                            res.status(200).json(receipt);
                        } else {
                            // If items is not an array at all
                            res.status(400).json({ message: 'Invalid items format.' });
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Server error while updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

export default receiptRouter;