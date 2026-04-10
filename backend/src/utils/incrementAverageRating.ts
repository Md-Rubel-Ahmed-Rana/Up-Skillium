const incrementAverageRating = (
  totalReviews: number,
  averageRating: number,
  newRating: number
): number => {
  const updatedTotalReviews = totalReviews + 1;
  const updatedAverageRating =
    (averageRating * totalReviews + newRating) / updatedTotalReviews;

  return parseFloat(updatedAverageRating.toFixed(2));
};

export default incrementAverageRating;
