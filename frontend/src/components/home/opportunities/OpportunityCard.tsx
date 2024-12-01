import { motion, MotionValue, useTransform } from "framer-motion";
import { BiNetworkChart } from "react-icons/bi";
import { FaCertificate, FaChalkboardTeacher } from "react-icons/fa";
import { MdGroup, MdWork } from "react-icons/md";

const icons = [
  <FaChalkboardTeacher key={1} className="text-5xl lg:text-9xl" />,
  <FaCertificate className="text-5xl lg:text-9xl" key={2} />,
  <BiNetworkChart className="text-5xl lg:text-9xl" key={4} />,
  <MdWork className="text-5xl lg:text-9xl" key={5} />,
  <MdGroup className="text-5xl lg:text-9xl" key={7} />,
];

type Props = {
  index: number;
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: MotionValue<number>;
  range: any;
  targetScale: number;
};

const OpportunityCard = ({
  index,
  title,
  description,
  color,
  progress,
  range,
  targetScale,
}: Props) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex justify-center items-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className={`flex flex-col lg:flex-row items-center justify-betweens lg:gap-10 relative -top-[25] lg:h-[300px] lg:w-[1000px] rounded-md lg:rounded-3xl p-2 lg:p-10 transform origin-top`}
      >
        {icons[index]}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg lg:text-3xl font-semibold">{title}</h3>
          <p className="text-sm lg:text-lg">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default OpportunityCard;
