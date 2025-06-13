import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI!;
    console.log("MongoDB URI exists:", !!mongoURI);
    console.log(
      "MongoDB URI preview:",
      mongoURI ? mongoURI.substring(0, 20) + "..." : "undefined"
    );
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    // PULL REQUEST
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
