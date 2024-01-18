import express from "express";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Contact from "./models/Contact.js";

const router = express.Router();

const secret = "josdbfasd8f23hr923br32fi3d9d32bu8934rf";

// Register
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (
		username === "" ||
		password === "" ||
		username === undefined ||
		password === undefined
	) {
		res.status(412).json({
			success: false,
			message: "Username or Password cannot be empty!",
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

// Login
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (
		username === "" ||
		password === "" ||
		username === undefined ||
		password === undefined
	) {
		res.status(412).json({
			success: false,
			message: "Username or Password cannot be empty!",
		});
	} else {
		const fetchedUserInfo = await User.findOne({ username });
		if (fetchedUserInfo?.password === password) {
			jwt.sign(
				{
					username,
					id: fetchedUserInfo._id,
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
				message: "Invalid credentials!",
			});
		}
	}
});

// Create contact
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

		try {
			const contactDoc = await Contact.create({
				namePrefix,
				fullName:
					namePrefix + firstName + middleName + lastName + nameSuffix,
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
		} catch (err) {
			res.status(412).json({
				success: false,
				err,
			});
		}
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

// Get all user contact
router.get("/getAllUserContacts", async (req, res) => {
	const { userId } = req.query;

	try {
		const contactsDoc = await Contact.find({ _id: userId })
			.populate("creator", ["id"])
			.collation({ locale: "en", strength: 2 })
			.sort({ fullName: 1 });

		res.status(200).json({
			success: true,
			contacts: contactsDoc,
		});
	} catch (err) {
		res.status(412).json({
			success: false,
			err,
		});
	}
});

// Delete contact
router.delete("/deleteContact", async (req, res) => {
	const { contact_app_login_token } = req.cookies;
	jwt.verify(contact_app_login_token, secret, {}, async (err, info) => {
		if (err) throw err;

		const { id } = req.body;

		try {
			const deleteContact = await Contact.deleteOne({ _id: id });
			if (deleteContact.deletedCount > 0) {
				res.status(200).json({
					success: true,
					message: "User contact deleted successfully!",
				});
			} else {
				res.status(412).json({
					success: false,
					message: "Contact not found!",
				});
			}
		} catch (err) {
			res.status(412).json({
				success: false,
				err,
			});
		}
	});
});

// Get user info
router.get("/getUserInfo", async (req, res) => {
	const { userId } = req.query;

	try {
		const userDoc = await User.findOne({ _id: userId });
		res.status(200).json({
			success: true,
			userInfo: userDoc,
		});
	} catch (err) {
		res.status(412).json({
			success: false,
			err,
		});
	}
});

// Get contact info
router.get("/getContactInfo", async (req, res) => {
	const { contactId } = req.query;

	try {
		const contactDoc = await Contact.findOne({ _id: contactId });
		res.status(200).json({
			success: true,
			userInfo: contactDoc,
		});
	} catch (err) {
		res.status(412).json({
			success: false,
			err,
		});
	}
});

// Update user contact info
router.put("/updateUserContactInfo", async (req, res) => {
	const { contact_app_login_token } = req.cookies;
	jwt.verify(contact_app_login_token, secret, {}, async (err, info) => {
		if (err) throw err;

		const { contactId } = req.query;
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

		try {
			const updatedContactDoc = await Contact.findOneAndUpdate(
				{ _id: contactId },
				{
					$set: {
						namePrefix,
						fullName:
							namePrefix +
							firstName +
							middleName +
							lastName +
							nameSuffix,
						firstName,
						middleName,
						lastName,
						nameSuffix,
						phoneNumber,
						emailAddress,
						address,
						dateOfBirth,
						additionalNote,
					},
				},
				{ new: true }
			)
				.then((updatedContact) => {
					if (updatedContact) {
						res.status(200).json({
							success: true,
							message: "Contact updated successfully",
							updatedContact,
						});
					} else {
						res.status(404).json({
							success: false,
							message: "Contact not found",
						});
					}
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({
						success: false,
						message: "Error updating contact",
					});
				});
		} catch (err) {
			res.status(412).json({
				success: false,
				err,
			});
		}
	});
});

export default router;
