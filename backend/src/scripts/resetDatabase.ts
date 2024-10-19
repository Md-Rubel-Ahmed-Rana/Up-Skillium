import mongoose from "mongoose";
import Database from "../config/database";
import { logger } from "../config/logger";

(async () => {
  try {
    logger.info("Database resetting started");
    await Database.connect();

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    await Promise.all(
      collections.map(async (collection) => {
        await mongoose.connection.db.dropCollection(collection.name);
        logger.info(`Dropped the collection ${collection.name}`);
      })
    );

    logger.info("Database reset complete");
  } catch (error) {
    logger.error("Error resetting database:", error);
  } finally {
    await mongoose.connection.close();
  }
})();
