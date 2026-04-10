const makeLessonTitleAsParamsUrl = (lessonTitle: string): string => {
  const urlString = lessonTitle
    ?.split(" ")
    ?.map((part) => part.toLowerCase())
    ?.join("-");
  return urlString;
};

export default makeLessonTitleAsParamsUrl;
