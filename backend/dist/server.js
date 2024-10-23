"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const port = envConfig_1.default.app.port;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const server = app_1.default.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.info(`Server is running on http://localhost:${port}`);
            yield database_1.default.connect();
        }));
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
    }
    catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
});
startServer();
