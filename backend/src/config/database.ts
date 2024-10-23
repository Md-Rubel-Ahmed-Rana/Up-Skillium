import mongoose from "mongoose";
import config from "./envConfig";

class Database {
  async connect() {
    console.info("Connecting to Database. Please wait...");
    try {
      await mongoose.connect(config.database.url);

      console.info("Database connected...");
    } catch (error: any) {
      console.error(`Database connection error: ${error.message}`);

      throw error;
    }

    mongoose.connection.on("connected", () => {
      console.info("Mongoose connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("Mongoose disconnected from database");
    });
  }
}

export default new Database();
