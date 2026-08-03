import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.mongoDBURL) {
            console.error("mongoDBURL environment variable is missing!");
            return;
        }
        await mongoose.connect(process.env.mongoDBURL, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("DB connected");
    } 
    catch (err) {
        console.error("DB Connection Error:", err.message);
    }
}