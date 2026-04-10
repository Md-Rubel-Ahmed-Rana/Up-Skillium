import { useInView } from "framer-motion";

type Direction =
  | "bottom-to-top"
  | "top-to-bottom"
  | "left-to-right"
  | "right-to-left";

const useAnimateCard = (ref: any, direction: Direction = "bottom-to-top") => {
  const isInView = useInView(ref, { once: false });

  const initialPosition = (() => {
    switch (direction) {
      case "top-to-bottom":
        return { y: -50, x: 0 };
      case "bottom-to-top":
        return { y: 50, x: 0 };
      case "left-to-right":
        return { y: 0, x: -50 };
      case "right-to-left":
        return { y: 0, x: 50 };
      default:
        return { y: 50, x: 0 };
    }
  })();

  const cardAttributes = {
    initial: { ...initialPosition, opacity: 0, scale: 0.95 },
    animate: isInView
      ? { y: 0, x: 0, opacity: 1, scale: 1 }
      : { ...initialPosition, opacity: 0, scale: 0.95 },
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      delay: 0.2,
    },
  };

  return { cardAnimation: cardAttributes };
};

export default useAnimateCard;
