import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
dotenv.config();

const productRouter = express.Router();

productRouter.post("/add", async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});



export default productRouter;