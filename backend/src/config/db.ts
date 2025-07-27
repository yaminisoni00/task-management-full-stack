import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || '')
        console.log(`✅ MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}
export default connectDb;