import { motion } from "framer-motion";

const hotOffers = [
  "🔥 Get 50-70% discount this month on all courses!",
  "🎓 Learn and grow with our end-of-year deals — up to 70% off!",
  "📚 Limited time only: Join now and save big on your learning journey!",
];

const HeadlineStreaming = () => {
  return (
    <div className="relative w-full overflow-hidden py-1 border-b border-gray-400">
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
          <div className="flex items-center text-sm font-semibold" key={index}>
            <h3>{offer}</h3>
            {hotOffers.length - 1 !== index && <span className="mx-5">|</span>}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeadlineStreaming;
