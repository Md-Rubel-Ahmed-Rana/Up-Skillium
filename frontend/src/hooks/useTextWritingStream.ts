import { useEffect, useState } from "react";

const useTextWritingStream = (changeableTexts: string[]): { text: string } => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const currentText = changeableTexts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting && displayedText.length < currentText.length) {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      } else if (!isDeleting && displayedText.length === currentText.length) {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % changeableTexts.length);
      }
    };

    timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [changeableTexts, displayedText, isDeleting, textIndex]);
  return { text: displayedText };
};

export default useTextWritingStream;
