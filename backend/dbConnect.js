import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/LMS");
        console.log("MongoDB connection established");
    } catch (err) {
        console.log("MongoDB connection error:", err);
    }
}

export default dbConnect;