"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const rolesSchema = new mongoose_1.Schema({
    role: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
    },
});
exports.Role = (0, mongoose_1.model)("Role", rolesSchema);
