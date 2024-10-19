import mongoose from "mongoose";
import { config } from "./envConfig";
import { logger } from "./logger";

class Database {
  async connect() {
    logger.info("Connecting to Database. Please wait...");
    try {
      await mongoose.connect(config.database.uri);

      logger.info("Database connected...");
    } catch (error: any) {
      logger.error(`Database connection error: ${error.message}`);

      throw error;
    }

    mongoose.connection.on("connected", () => {
      logger.info("Mongoose connected to database");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("Mongoose disconnected from database");
    });
  }
}

export default new Database();
