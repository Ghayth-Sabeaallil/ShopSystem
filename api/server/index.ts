import Mongoose from "mongoose";
import Express from "express";
import dotenv from 'dotenv';
import { apiRouter } from "./api";
const port = 3000;
dotenv.config();
const app = Express();
console.log("Attempting to connect to mongodb..");

Mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow all origins
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log("request to the url: " + req.url);
    next();
});

app.use("/api", apiRouter);
console.log("Starting server...");
app.listen(port, () => {
    console.log("Server is listening on " + port);
});