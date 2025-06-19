import mongoose from 'mongoose';

export const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME || "shoe Store"
        });
        console.log("🟢 MongoDB connected successfully!");
          
    } catch (error) {
        console.error("🔴 MongoDB connection error", error);
        process.exit(1)
    }
}