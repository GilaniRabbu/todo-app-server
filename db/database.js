import mongoose from "mongoose";

const connectBD = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected Database");
  } catch (error) {
    console.log(error);
  }
}

export default connectBD;