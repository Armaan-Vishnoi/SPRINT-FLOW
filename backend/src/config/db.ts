import mongoose from "mongoose";

export const connectDB = async () => {
  try {
      console.log("MongoDB Connected");

    await mongoose.connect(
      process.env.MONGO_URI as string
    );

    console.log("MongoDB Connected");
  } catch (error: any) {
    console.log("========== ERROR ==========");
    console.log(error.name);
    console.log(error.message);
    console.log(error);
    console.log("===========================");

    process.exit(1);
  }
};