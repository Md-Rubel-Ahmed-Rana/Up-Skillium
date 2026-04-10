import useTextWritingStream from "@/hooks/useTextWritingStream";
import { motion } from "framer-motion";

const changeableTexts = [
  "Explore our wide range of courses",
  "Advance your career with expert guidance",
  "Get support from world-class mentors",
  "Join our 500+ successful graduates",
];

const WelcomeContainer = () => {
  const { text } = useTextWritingStream(changeableTexts);
  return (
    <div className="w-full py-5">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-2xl lg:text-3xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn. Grow. Lead. Your Online Career Starts Here
        </motion.h1>
        <div className="text-xl lg:text-2xl font-semibold h-16 flex justify-center items-center">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <span className="typing">{text}</span>
            <span className="blinking-cursor">|</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;
