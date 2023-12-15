import mongoose, { Schema } from "mongoose";

const ContactSchema = new mongoose.Schema({
    namePrefix: String,
    fullName: String,
    firstName: {
        type: String,
        required: true,
    },
    middleName: String,
    lastName: String,
    nameSuffix: String,
    phoneNumber: String,
    emailAddress: String,
    address: String,
    dateOfBirth: Date,
    additionalNote: String,

    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;