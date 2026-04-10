"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateTeacherId = (lastTeacherId) => {
    const parts = lastTeacherId.split("-");
    const numericPart = parts[2];
    const newNumericPart = (parseInt(numericPart, 10) + 1)
        .toString()
        .padStart(4, "0");
    const incrementedId = `US-TE-${newNumericPart}`;
    return incrementedId;
};
exports.default = generateTeacherId;
