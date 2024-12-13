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
    <div className="w-full py-5 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-2xl lg:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Up Skillium
        </motion.h1>
        <div className="text-xl lg:text-3xl font-semibold h-16 flex justify-center items-center">
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
        <motion.p
          className="mt-3 text-lg text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          We empower students to build successful careers in their chosen fields
          with industry-leading resources and support.
        </motion.p>
      </div>
    </div>
  );
};

export default WelcomeContainer;
