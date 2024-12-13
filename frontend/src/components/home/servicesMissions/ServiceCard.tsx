import { motion } from "framer-motion";

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
  return (
    <motion.div
      data-aos="zoom-in-up"
      key={index}
      className={`p-6 shadow-lg rounded-lg relative z-10 border-l-4 bg-gradient-to-b from-purple-500 to-pink-500 transition-transform transform hover:scale-105 hover:shadow-2xl ${
        index % 2 === 0
          ? "border-blue-500 lg:ml-16"
          : "border-green-500 lg:mr-16"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{service.icon}</span>
        <h3 className="text-md lg:text-xl font-semibold text-white">
          {service.title}
        </h3>
      </div>
      <p className="text-white mt-2 text-sm lg:text-md">
        {service.description}
      </p>
      {length - 1 !== index && (
        <motion.div
          className={`absolute lg:h-1 lg:w-20 h-20 w-1  from-blue-500 to-green-500 ${
            index % 2 === 0
              ? "bg-gradient-to-b lg:top-1/2 lg:left-full lg:translate-x-4 top-full left-1/2 -translate-x-1/2"
              : "lg:top-1/2 bg-gradient-to-t lg:bg-gradient-to-t lg:from-transparent lg:to-transparent  lg:right-full lg:-translate-x-4 top-full left-1/2 -translate-x-1/2"
          }`}
          initial={{ scaleX: 0, scaleY: 0 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default ServiceCard;
