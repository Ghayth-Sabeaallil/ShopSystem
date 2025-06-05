import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
dotenv.config();

const productRouter = express.Router();

productRouter.post("/register", async (req, res) => {
    try {
        const newItem = new ProductsModel({
            ...req.body,
        });
        await newItem.save();
        res.send(newItem);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});


export default productRouter;