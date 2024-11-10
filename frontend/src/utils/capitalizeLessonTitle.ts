const capitalizeLessonTitle = (lessonTitle: string = ""): string => {
  const words = lessonTitle?.split("-");
  const combined = words?.map((word) => {
    const firstLetter = word?.slice(0, 1)?.toUpperCase();
    const remainingLetters = word?.slice(1, lessonTitle?.length);
    return `${firstLetter}${remainingLetters}`;
  });

  return combined.join(" ");
};

export default capitalizeLessonTitle;
