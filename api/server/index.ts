import Mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./api";

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

console.log("Attempting to connect to MongoDB...");

Mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

/**
 * CORS Configuration
 * Allows both local dev and GitHub Pages frontend
 */
const allowedOrigins = [
    "http://localhost:5173",                // Vite Dev Server
    "https://ghayth-sabeaallil.github.io",  // GitHub Pages domain
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like Postman or server-to-server)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed for this origin"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Handle preflight OPTIONS automatically
app.options("*", cors());

app.use(Express.json());
app.use("/users", apiRouter);

console.log("Starting server...");
app.listen(port, () => {
    console.log("Server is listening on " + port);
});
