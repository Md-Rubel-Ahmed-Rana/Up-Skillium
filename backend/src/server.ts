import app from "./app";
import Database from "./config/database";
import config from "./config/envConfig";

const port = config.app.port;

const startServer = async () => {
  try {
    await Database.connect();
    const server = app.listen(port, async () => {
      console.info(`🚀 Application is running on port ${port}`);
    });

    process.on("SIGINT", () => {
      server.close(() => {
        console.info("Server is gracefully shutting down");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        console.info("Server is gracefully shutting down");
        process.exit(0);
      });
    });
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
