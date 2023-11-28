import express from "express";
import User from "./models/User.js"
import jwt from "jsonwebtoken";

const router = express.Router();

const secret = "josdbfasd8f23hr923br32fi3d9d32bu8934rf";


router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (username === "" || password === "" || username === undefined || password === undefined) {
        res.status(412).json({
            success: false,
            message: "Username or Password cannot be empty!"
        });
    } else {
        try {
            // Creating new user entry
            const userInfo = await User.create({
                username,
                password,
            });
            res.json({
                success: true,
                userInfo,
            });
        } catch (err) {
            res.status(412).json({
                success: false, 
                err,
            });
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username === "" || password === "" || username === undefined || password === undefined) {
        res.status(412).json({
            success: false,
            message: "Username or Password cannot be empty!"
        });
    } else {
        const fetchedUserInfo = await User.findOne({ username });
        if (fetchedUserInfo?.password === password) {
            jwt.sign(
                {
                    username,
                    id: fetchedUserInfo._id
                },
                secret,
                {},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie("contact_app_login_token", token).json({
                        success: true,
                        username,
                        id: fetchedUserInfo._id,
                    });
                }
            );
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            })
        }
    }
});

export default router;