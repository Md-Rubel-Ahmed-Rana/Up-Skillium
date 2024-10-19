import bcrypt from "bcrypt";
import Database from "../config/database";
import { logger } from "../config/logger";
import { usersFakeData } from "../seedDb/usersFakeData";
import { User } from "../models/user.model";
import mongoose from "mongoose";

(async () => {
  try {
    await Database.connect();
    logger.info("Seeding started. Please wait...");

    for (const user of usersFakeData) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const hashedUser = { ...user, password: hashedPassword };
      await User.create(hashedUser);
      logger.info(`Seed user [${user.name}] data inserted successfully`);
    }

    logger.info("Seeding complete. Exiting...");
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding users:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
