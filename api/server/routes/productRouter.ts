import express from 'express';
import dotenv from 'dotenv';
import { ProductsModel } from '../models/products';
import jwt from "jsonwebtoken";
import UserModel from '../models/users';
dotenv.config();

const productRouter = express.Router();

productRouter.post("/add", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const owner_id = decoded.userId;
            const { bar_code } = req.body;
            const existingProduct = await ProductsModel.findOne({ owner_id, bar_code });
            if (existingProduct) {
                res.status(400).json({ msg: "Product with this owner_id and bar_code already exists." });
            }
            else {
                const newItem = new ProductsModel({ ...req.body, owner_id: owner_id });
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
        const user = await UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'No User Found' });
            return;
        }
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

productRouter.put("/edit", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const userId = decoded.userId;
        const { id: productId, name, bar_code, buying_price, selling_price, buying_amount, selling_amount, minimum_amount } = req.body;
        if (!productId) {
            res.status(400).json({ message: 'Product ID is required.' });
        }
        if (!name || !bar_code || buying_price == null || selling_price == null || buying_amount == null || selling_amount == null || minimum_amount == null) {
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
        product.name = name;
        product.bar_code = bar_code;
        product.buying_price = buying_price;
        product.selling_price = selling_price;
        product.buying_amount = buying_amount;
        product.selling_amount = selling_amount;
        product.minimum_amount = minimum_amount;
        await product.save();
        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (error) {
        console.error('Server error while updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

productRouter.put("/sale", async (req, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const userId = decoded.userId;
        const { id: productId, sale_price } = req.body;
        if (!productId) {
            res.status(400).json({ message: 'Product ID is required.' });
        }
        if (sale_price == null) {
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
        if (product.selling_price === sale_price) {
            // Remove sale price and expiration
            product.sale_price = undefined;
        } else {
            // Set sale price and expiration
            product.sale_price = sale_price;
        }
        await product.save();
        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Server error while updating product:', error);
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
        const productsToUpdate = req.body.product;
        if (!Array.isArray(productsToUpdate) || productsToUpdate.length === 0) {
            res.status(400).json({ message: 'No products provided for update.' });
        }
        for (const productData of productsToUpdate) {
            const { id: productId, amount } = productData;
            if (!productId) {
                continue;
            }
            const product = await ProductsModel.findById(productId);
            if (!product) {
                continue;
            }
            if (product.owner_id.toString() !== userId) {
                continue;
            }
            if (req.body.action === 'return') {

                product.buying_amount = (product.buying_amount || 0) + amount;
                product.selling_amount = (product.selling_amount || 0) - amount;
            }
            else {
                product.buying_amount = (product.buying_amount || 0) - amount;
                product.selling_amount = (product.selling_amount || 0) + amount;
            }

            await product.save();
        }
        res.status(200).json({ message: 'Products updated successfully.' });
    } catch (error) {
        console.error('Server error while updating products:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


export default productRouter;