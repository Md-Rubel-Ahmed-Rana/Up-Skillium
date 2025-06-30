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
exports.CommonService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const documents_1 = require("../../constants/documents");
class Service {
    getTotalDocumentCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = mongoose_1.default.connection.db;
            const collections = yield db.listCollections().toArray();
            const results = [];
            for (const { name: collectionName } of collections) {
                const count = yield db.collection(collectionName).countDocuments();
                const meta = documents_1.COLLECTION_METADATA[collectionName];
                if (meta) {
                    results.push({
                        name: meta.name,
                        documents: count,
                        description: meta.description,
                    });
                }
            }
            return results;
        });
    }
}
exports.CommonService = new Service();
