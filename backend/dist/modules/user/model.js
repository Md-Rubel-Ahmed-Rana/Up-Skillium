"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const schemaOption_1 = __importDefault(require("../../utils/schemaOption"));
const addressSchema = new mongoose_1.Schema({
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
});
const emergencyContactSchema = new mongoose_1.Schema({
    name: { type: String },
    relationship: { type: String },
    phone: { type: String },
});
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Role",
    },
    roleName: {
        type: String,
        required: true,
    },
    userRoleId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    address: {
        type: addressSchema,
    },
    emergencyContact: {
        type: emergencyContactSchema,
    },
}, schemaOption_1.default);
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
