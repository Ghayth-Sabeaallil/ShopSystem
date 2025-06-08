import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
import jwt from "jsonwebtoken";
dotenv.config();

const productRouter = express.Router();

productRouter.post("/add", async (req, res) => {
    try {
        const token = req.cookies["token"]; // Replace with actual cookie name
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const { owner_id, bar_code } = req.body;
            const existingProduct = await ProductsModel.findOne({ owner_id, bar_code });
            if (existingProduct) {
                res.status(400).json({ msg: "Product with this owner_id and bar_code already exists." });
            }
            else {
                const newItem = new ProductsModel({ ...req.body });
                await newItem.save();
                res.send(newItem);
            }
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

productRouter.get("/getByOwner", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const event = await ProductsModel.find({ owner_id: decoded.userId }).exec();
            res.status(200).json(event);
        }
    } catch (err) {
        res.status(500).json({ message: "Error getting user products", err });
    }
});

{/*
    productRouter.delete("/delete", async (req, res) => {
    try {
        const token = req.cookies["token"]; // Replace with actual cookie name
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            req.user = decoded;
            const _id = req.params._id;
            const item = await ProductsModel.findById(_id);
            if (item?.creator.toString() !== req.user.userId) {
                res.status(403).json({ message: 'Not authorized to delete this item' });
            }
            await item!.deleteOne();
            res.send(item);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});
    */}
export default productRouter;