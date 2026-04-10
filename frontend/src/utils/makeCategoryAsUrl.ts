const makeCategoryAsUrl = (category: string): string => {
  const url = category
    .split(" ")
    .map((part) => part.toLowerCase())
    .join("-");
  return url;
};

export default makeCategoryAsUrl;
