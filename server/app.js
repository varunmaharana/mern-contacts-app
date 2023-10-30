import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";

const app = express();

dotenv.config({
	path: "./config/config.env",
});

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(
	urlencoded({
		extended: true,
	})
);

// Connecting Database
connectDB();

// ROUTES or API-ENDPOINTS
import crudRoutes from "./routes.js";

app.use("/api", crudRoutes);

// Served using this
app.listen(process.env.DEV_PORT, () => {
    console.log("Server is running at port:", process.env.DEV_PORT);
})