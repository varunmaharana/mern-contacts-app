import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);

export default User;