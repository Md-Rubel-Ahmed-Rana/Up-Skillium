"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateStudentId = (lastStudentId) => {
    const parts = lastStudentId.split("-");
    const numericPart = parts[2];
    const newNumericPart = (parseInt(numericPart, 10) + 1)
        .toString()
        .padStart(4, "0");
    const incrementedId = `US-ST-${newNumericPart}`;
    return incrementedId;
};
exports.default = generateStudentId;
