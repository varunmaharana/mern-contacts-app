import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.js"
import Contact from "./models/Contact.js";

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

router.post("/createContact", async (req, res) => {
    // const {
    //     namePrefix,
    //     firstName,
    //     middleName,
    //     lastName,
    //     nameSuffix,
    //     phoneNumber,
    //     emailAddress,
    //     address,
    //     dateOfBirth,
    //     additionalNote,
    //     creator,
    // } = req.body;

    const { contact_app_login_token } = req.cookies;
	jwt.verify(contact_app_login_token, secret, {}, async (err, info) => {
		if (err) throw err;
		const { 
            namePrefix,
            fullName,
            firstName,
            middleName,
            lastName,
            nameSuffix,
            phoneNumber,
            emailAddress,
            address,
            dateOfBirth,
            additionalNote,
        } = req.body;

		const contactDoc = await Contact.create({
			namePrefix,
            fullName,
            firstName,
            middleName,
            lastName,
            nameSuffix,
            phoneNumber,
            emailAddress,
            address,
            dateOfBirth,
            additionalNote,
            creator: info.id,
		});
		res.status(200).json({
            success: true,
            createdContact: contactDoc, 
        });
	});


    // try {
    //     // Creating new contact entry
    //     const contactInfo = await Contact.create({
    //         namePrefix,
    //         firstName,
    //         middleName,
    //         lastName,
    //         nameSuffix,
    //         phoneNumber,
    //         emailAddress,
    //         address,
    //         dateOfBirth,
    //         relation,
    //         additionalNote,
    //         owner,
    //     });
    //     res.json({
    //         success: true,
    //         contactInfo,
    //     });
    // } catch (err) {
    //     res.status(412).json({
    //         success: false, 
    //         err,
    //     });
    // }
});

router.get("/getAllUserContacts", async (req, res) => {
    const { userId } = req.query;
    
    const contactsDoc = await Contact.find().populate("creator", ["id"]).sort({fullName: 1});

    res.status(200).json({
        success: true,
        contacts: contactsDoc,
    });
})

export default router;