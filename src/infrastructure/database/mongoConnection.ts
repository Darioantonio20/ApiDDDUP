// src/infrastructure/database/mongoConnection.ts
import mongoose from 'mongoose';

const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
        });
        console.log("Connected to MongoDB database");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectMongoDB;
