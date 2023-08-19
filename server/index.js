import express, { urlencoded } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectDB from "./config/database.js";

const app = express();

dotenv.config({
	path: "./config/config.env",
});

app.use(express.json());
app.use(
	urlencoded({
		extended: true,
	})
);

// Connecting Database
connectDB();




// Served using this
app.listen(4000, () => {
    console.log("Server is running at port: 4000");
})