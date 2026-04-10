import { useInView } from "framer-motion";

const useTittleDescAnimation = (ref: any) => {
  const isInView = useInView(ref, { once: false });

  const titleAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const descAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 },
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  };

  return { title: titleAnimation, desc: descAnimation };
};

export default useTittleDescAnimation;
