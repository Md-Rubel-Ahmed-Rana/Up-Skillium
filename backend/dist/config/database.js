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
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("./envConfig"));
class Database {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info("Connecting to Database. Please wait...");
            try {
                yield mongoose_1.default.connect(envConfig_1.default.database.url);
                console.info("Database connected...");
            }
            catch (error) {
                console.error(`Database connection error: ${error.message}`);
                throw error;
            }
            mongoose_1.default.connection.on("connected", () => {
                console.info("Mongoose connected to database");
            });
            mongoose_1.default.connection.on("error", (err) => {
                console.error(`Mongoose connection error: ${err}`);
            });
            mongoose_1.default.connection.on("disconnected", () => {
                console.warn("Mongoose disconnected from database");
            });
        });
    }
}
exports.default = new Database();
