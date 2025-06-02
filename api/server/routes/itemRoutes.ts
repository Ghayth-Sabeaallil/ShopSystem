import express from 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { ItemModel, Item } from "../models/items";
dotenv.config();


const itemRouter = express.Router();
interface AuthRequest extends Request {
    user?: { userId: string };
}

itemRouter.put("/update/:_id", async (req: AuthRequest, res) => {
    try {

        const { is_active } = req.body;
        const token = req.cookies["token"]; // Ensure correct cookie name
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            req.user = decoded;
            const _id = req.params._id;
            const item = await ItemModel.findById(_id);
            if (item?.creator.toString() !== req.user.userId) {
                res.status(403).json({ message: 'Not authorized to get Imges from this item' });
            }
            const updatedItem = await ItemModel.findByIdAndUpdate(_id, { is_active }, { new: true });
            res.send(updatedItem);
        }

    } catch (err) {
        res.status(500).json({ message: "Error Edit Event", err });
    }
});

interface FilterQuery {
    city?: string;
    type?: string;
    room?: string;
    price?: string;
    area?: string;
}


itemRouter.get("/filter", async (req, res) => {
    const { city, type, room, price, area } = req.query;
    try {
        let filterQuery: { is_active: boolean, city?: string, type?: string, rooms?: { $lte: number }, price?: { $lte: number }, area?: { $lte: number } } = { is_active: true };
        if (city && city !== "جميع المحافظات") {
            filterQuery.city = city as string;
        }
        if (type) {
            filterQuery.type = type as string;
        }
        if (room && !isNaN(Number(room))) {
            filterQuery.rooms = { $lte: Number(room) };
        }
        if (price && !isNaN(Number(price))) {
            filterQuery.price = { $lte: Number(price) };
        }
        if (area && !isNaN(Number(area))) {
            filterQuery.area = { $lte: Number(area) };
        }
        console.log("Constructed Filter Query:", filterQuery);
        /*
        const items: Item[] = await ItemModel.find(filterQuery);
        if (items.length === 0) {
            res.status(404).json({ message: "No items found matching the filter criteria." });
        }

        res.json(items);
        */
    } catch (err) {
        console.error("Error during filtering:", err);
        res.status(500).send("Error retrieving data from the database.");
    }
});

//get all item by creator
itemRouter.get("/creator", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded;
        const id = req.user.userId;
        const items = await ItemModel.find({ creator: id, is_active: true }).exec();
        res.send(items);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all apartment
itemRouter.get("/apartments", async (req, res) => {
    try {
        const items = await ItemModel.find({ type: "شقة", is_active: true }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all farms
itemRouter.get("/farms", async (req, res) => {
    try {
        const items = await ItemModel.find({ type: "أرض", is_active: true }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all shops
itemRouter.get("/shops", async (req, res) => {
    try {
        const items = await ItemModel.find({ type: "محل", is_active: true }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all villas
itemRouter.get("/villas", async (req, res) => {
    try {
        const items = await ItemModel.find({ type: "فيلا", is_active: true }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all active
itemRouter.get("/allActive", async (req, res) => {
    try {
        const items = await ItemModel.find({ is_active: true }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get all unactive
itemRouter.get("/allUnActive", async (req, res) => {
    try {
        const items = await ItemModel.find({ is_active: false }).exec();
        if (items) {
            res.send(items);
        }
        else {
            res.status(401).json({ message: 'No item found' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//get by id
itemRouter.get("/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        if (_id.length >= 24) {
            const item = await ItemModel.findById(_id);
            if (item) {
                res.send(item);
            }
            else {
                res.status(204).json({ message: 'No item found' });
            }
        } else {
            res.status(401).json({ message: 'The ID must be at least 24 char' });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});



//register an item
itemRouter.post("/register", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"];
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded;
        const _id = req.user.userId;
        const newItem = new ItemModel({
            ...req.body,
            creator: _id
        });
        await newItem.save();
        res.send(newItem);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: 'Server error', error });
    }
});

//delete an item
itemRouter.delete("/delete/:_id", async (req: AuthRequest, res) => {
    try {
        const token = req.cookies["token"]; // Replace with actual cookie name
        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
            req.user = decoded;
            const _id = req.params._id;
            const item = await ItemModel.findById(_id);
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

itemRouter.delete("/delete-image", async (req, res) => {
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_APISECRET,
    });
    try {
        const { public_ids } = req.body; // Expect an array of public IDs
        if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
            res.status(400).json({ error: "Invalid public_ids array" });
        }
        const results = await Promise.all(
            public_ids.map((publicId) => cloudinary.api.delete_resources(publicId))
        );
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ error: "Error deleting images", details: error });
    }
});

export default itemRouter;