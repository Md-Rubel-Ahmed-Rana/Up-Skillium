import howItWorksData from "@/constants/howItWork";
import {
  FaBriefcase,
  FaCertificate,
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardCheck,
  FaLock,
  FaSearch,
  FaTools,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const iconMapping: Record<string, any> = {
  explore: <FaSearch />,
  enroll: <FaUserGraduate />,
  expert: <FaChalkboardTeacher />,
  quiz: <FaClipboardCheck />,
  progress: <FaChartLine />,
  community: <FaUsers />,
  certificate: <FaCertificate />,
  career: <FaBriefcase />,
  access: <FaLock />,
  upgrade: <FaTools />,
};

const VerticalCards = () => {
  return (
    <VerticalTimeline animate={true}>
      {howItWorksData.map((item, index) => (
        <VerticalTimelineElement
          key={item.id}
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.3)",
          }}
          iconStyle={{
            background: "linear-gradient(to bottom, #3b82f6, #ec4899)",
            color: "#fff",
          }}
          icon={iconMapping[item.icon]}
          {...(index === 0 && { className: "first-timeline-element" })}
          {...(index === howItWorksData.length - 1 && {
            className: "last-timeline-element",
          })}
        >
          <h3 className="vertical-timeline-element-title text-lg font-bold">
            {item.title}
          </h3>
          <p className="text-sm">{item.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default VerticalCards;
