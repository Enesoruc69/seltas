import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

export async function dbBaglan() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGO_URI);
}
