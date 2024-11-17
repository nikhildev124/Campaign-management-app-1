import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connection = async () => {
  const URL = process.env.MONGODB_URI;
  const options: ConnectOptions = {
    bufferCommands: false,
  };
  try {
    await mongoose.connect(URL!, options);
    console.log("Database connected sucessfully");
  } catch (error: any) {
    console.log("error while connecting with the database", error.message);
  }
};
