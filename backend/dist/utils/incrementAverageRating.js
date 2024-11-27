"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const incrementAverageRating = (totalReviews, averageRating, newRating) => {
    const updatedTotalReviews = totalReviews + 1;
    const updatedAverageRating = (averageRating * totalReviews + newRating) / updatedTotalReviews;
    return parseFloat(updatedAverageRating.toFixed(2));
};
exports.default = incrementAverageRating;
