"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractFilePath = (url) => {
    const pathMatch = url.match(/(?<=up-skillium\.appspot\.com\/)(.*?)(?=\?)/);
    const filePath = pathMatch && pathMatch[0];
    return filePath;
};
exports.default = extractFilePath;
