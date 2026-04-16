import mongoose from "mongoose";
import config from "./envConfig";

class Database {
  async connect() {
    console.log("⏳ Connecting MongoDB Database...");
    try {
      await mongoose.connect(config.database.url);

      console.log("✅ MongoDB Connected Successfully!");
    } catch (error: any) {
      console.error(`Database connection error: ${error.message}`);

      throw error;
    }

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected Successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection failed. Error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  }
}

export default new Database();
