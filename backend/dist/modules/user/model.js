"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});
const emergencyContactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
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
    role: {
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
    address: {
        type: addressSchema,
    },
    emergencyContact: {
        type: emergencyContactSchema,
    },
    permissions: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)("User", exports.userSchema);
