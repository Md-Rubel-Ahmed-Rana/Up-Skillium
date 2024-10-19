import app from "./app";
import Database from "./config/database";
import { config } from "./config/envConfig";
import { logger } from "./config/logger";

const port = config.app.port;

const startServer = async () => {
  try {
    const server = app.listen(port, async () => {
      logger.info(`Server is running on http://localhost:${port}`);
      await Database.connect();
    });

    process.on("SIGINT", () => {
      server.close(() => {
        logger.info("Server is gracefully shutting down");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        logger.info("Server is gracefully shutting down");
        process.exit(0);
      });
    });
  } catch (error: any) {
    logger.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
