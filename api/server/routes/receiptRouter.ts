import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
import jwt from "jsonwebtoken";
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
            const newItem = new ProductsModel({ ...req.body, owner_id: owner_id });
            await newItem.save();
            res.send(newItem);
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

export default receiptRouter;