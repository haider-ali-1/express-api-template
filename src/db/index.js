import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("connected with database successfully");
  } catch (error) {
    console.log(`failed to connect with database`, error);
  }
};

export { connectDB };
