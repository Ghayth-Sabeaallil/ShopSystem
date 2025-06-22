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

export default receiptRouter;