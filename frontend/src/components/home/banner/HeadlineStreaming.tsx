import { motion } from "framer-motion";

const hotOffers = [
  "🔥 Get 50-70% discount this December on all courses!",
  "🎓 Learn and grow with our end-of-year deals — up to 70% off!",
  "📚 Limited time only: Join now and save big on your learning journey!",
];

const HeadlineStreaming = () => {
  return (
    <div className="relative w-full overflow-hidden py-2 border-b">
      <div className="absolute inset-0  blur-md h-full w-full -z-10 opacity-50"></div>

      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {hotOffers.map((offer, index) => (
          <div
            className="text-white flex items-center text-lg font-semibold"
            key={index}
          >
            <h3>{offer}</h3>
            {hotOffers.length - 1 !== index && (
              <span className="mx-5 text-white">|</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeadlineStreaming;
