import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
import jwt from "jsonwebtoken";
dotenv.config();

const productRouter = express.Router();

productRouter.post("/add", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const ownerId = decoded.userId;
            const { bar_code } = req.body;
            const existingProduct = await ProductsModel.findOne({ ownerId, bar_code });
            if (existingProduct) {
                res.status(400).json({ msg: "Product with this owner_id and bar_code already exists." });
            }
            else {
                const newItem = new ProductsModel({ ...req.body, owner_id: ownerId });
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
        const token = req.cookies["token"];
        if (token !== undefined) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const event = await ProductsModel.find({ owner_id: decoded.userId }).exec();
            res.status(200).json(event);
        }
    } catch (err) {
        res.status(500).json({ message: "Error getting user products", err });
    }
});


productRouter.delete("/delete", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const userId = decoded.userId;
        const { id: productId } = req.body;
        if (!productId) {
            res.status(400).json({ message: 'Product ID is required.' });
        }
        const product = await ProductsModel.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }
        if (product.owner_id.toString() !== userId) {
            res.status(403).json({ message: 'Not authorized to delete this product.' });
        }
        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Server error while deleting product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

productRouter.put("/update", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const userId = decoded.userId;

        const { id: productId, name, bar_code, buying_price, selling_price, buying_amount, selling_amount } = req.body;

        if (!productId) {
            res.status(400).json({ message: 'Product ID is required.' });
        }

        // Basic validation: you can improve this by using a schema validator
        if (!name || !bar_code || buying_price == null || selling_price == null || buying_amount == null || selling_amount == null) {
            res.status(400).json({ message: 'All product fields are required.' });
        }

        const product = await ProductsModel.findById(productId);

        if (!product) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }

        if (product.owner_id.toString() !== userId) {
            res.status(403).json({ message: 'Not authorized to update this product.' });
            return;
        }

        // Update fields
        product.name = name;
        product.bar_code = bar_code;
        product.buying_price = buying_price;
        product.selling_price = selling_price;
        product.buying_amount = buying_amount;
        product.selling_amount = selling_amount;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (error) {
        console.error('Server error while updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});



export default productRouter;