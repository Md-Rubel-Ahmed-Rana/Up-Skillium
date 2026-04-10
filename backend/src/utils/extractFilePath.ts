const extractFilePath = (url: string): string | null => {
  const pathMatch = url.match(/(?<=up-skillium\.appspot\.com\/)(.*?)(?=\?)/);
  const filePath = pathMatch && (pathMatch[0] as string);
  return filePath;
};

export default extractFilePath;
