import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gautamchhavi13:meow123@cluster0.zslnadg.mongodb.net/ResuMeow')
    .then(() => console.log('DB CONNECTED'))
}