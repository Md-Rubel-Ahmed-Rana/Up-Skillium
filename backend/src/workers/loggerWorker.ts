import { parentPort } from "worker_threads";
import { logger } from "../config/logger";

console.log("From Worker Thread");

if (parentPort) {
  console.log("Inside Parent Port");
  parentPort.on("message", (logMessage: string) => {
    console.log("Received message in worker:", logMessage);
    logger.info(logMessage);
  });
}
