import mongoose from "mongoose";

const connectDB = async () => {
    const {connection} = await mongoose.connect(process.env.MONGODB_URI).catch(err => console.log(err));
    
    // If connection successfull
    console.log(`Database is connected with ${connection.host}`);
}

export default connectDB;