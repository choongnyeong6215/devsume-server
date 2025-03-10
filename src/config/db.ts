import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      autoIndex: false,
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
