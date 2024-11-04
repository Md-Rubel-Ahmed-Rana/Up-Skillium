"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textWrapLineBreaker = (text, maxWidth, font, fontSize) => {
    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
        if (width < maxWidth) {
            currentLine += " " + word;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};
exports.default = textWrapLineBreaker;
