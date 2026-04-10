import { useCardBottomToTopAnimation } from "@/hooks/useCardBottomToTopAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type Props = {
  service: Service;
  index: number;
  length: number;
};

const ServiceCard = ({ service, index, length }: Props) => {
  const ref = useRef(null);
  const { animation } = useCardBottomToTopAnimation(ref);
  return (
    <motion.div
      {...animation}
      ref={ref}
      key={index}
      className={`p-6 shadow-lg rounded-lg relative z-10 border-l-4 transition-transform transform hover:scale-100 hover:shadow-2xl ${
        index % 2 === 0 ? "border-blue-500 " : "border-green-500"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{service.icon}</span>
        <h3 className="text-md lg:text-xl font-semibold">{service.title}</h3>
      </div>
      <p className="mt-2 text-sm lg:text-md">{service.description}</p>
    </motion.div>
  );
};

export default ServiceCard;
