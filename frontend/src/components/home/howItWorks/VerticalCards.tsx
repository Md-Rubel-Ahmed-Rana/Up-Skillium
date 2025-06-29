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
    <VerticalTimeline className="w-full overflow-hidden" animate={true}>
      {howItWorksData.map((item, index) => (
        <VerticalTimelineElement
          key={item.id}
          className="vertical-timeline-element--work text-gray-800"
          contentStyle={{
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          contentArrowStyle={{
            borderRight: "7px solid rgba(255, 255, 255, 0.3)",
          }}
          iconStyle={{
            background: "#578FCA",
            color: "#fff",
          }}
          icon={iconMapping[item.icon]}
          {...(index === 0 && { className: "first-timeline-element" })}
          {...(index === howItWorksData.length - 1 && {
            className: "last-timeline-element",
          })}
        >
          <h3 className="vertical-timeline-element-title text-gray-800 text-lg font-bold">
            {item.title}
          </h3>
          <p className="text-sm text-gray-700">{item.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default VerticalCards;
