import Mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { apiRouter } from "./api";
const port = 3000;
dotenv.config();
const app = Express();
console.log("Attempting to connect to mongodb..");

Mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(
    cors({
        origin: ["https://ghayth-sabeaallil.github.io", "http://localhost:5173"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.header("Origin"));
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

app.use("/api", apiRouter);
console.log("Starting server...");
app.listen(port, () => {
    console.log("Server is listening on " + port);
});