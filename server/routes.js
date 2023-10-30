import express from "express";
import User from "./models/User.js"

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Creating new user entry
        const userInfo = User.create({
            username,
            password,
        });
        res.json({
            success: true,
            userInfo,
        });
    } catch (err) {
        res.json({
            success: false, 
            err,
        });
    }
});

export default router;