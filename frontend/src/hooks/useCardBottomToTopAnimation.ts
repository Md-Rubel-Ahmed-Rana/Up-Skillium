import { useInView } from "framer-motion";

export const useCardBottomToTopAnimation = (ref: any) => {
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const animation = {
    initial: { y: 50, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  };

  return { animation };
};
