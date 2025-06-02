import Mongoose from "mongoose";
import Express from "express";
import dotenv from 'dotenv';
import { apiRouter } from "./api";
import cors from "cors"
const port = 3000;
dotenv.config();
const app = Express();


console.log("Attempting to connect to mongodb..");

Mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow all origins
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    console.log("Got a request to the url: " + req.url);
    next();
});*/


app.use(
    cors({
        origin: "https://tabo963.com", // Match your custom domain (no trailing slash)
        methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow all relevant methods
        credentials: true, // If using cookies or authentication
        allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    })
);

// Explicitly handle OPTIONS requests if needed
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://tabo963.com"); // Match your custom domain exactly
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200); // Respond to OPTIONS with status 200
});



app.use("/api", apiRouter);

console.log("Starting server...");

app.listen(port, () => {
    console.log("Server is listening on " + port);
});