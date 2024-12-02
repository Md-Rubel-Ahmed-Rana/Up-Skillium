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

const HowItWorks = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative border-t border-gray-400 px-2 lg:px-5">
      <h2 className="text-center text-3xl font-bold mb-10">
        How <span className="text-yellow-300">Up Skillium</span> Works
      </h2>
      <VerticalTimeline>
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

      <style jsx>{`
        .first-timeline-element .vertical-timeline-element-content::before {
          content: none;
        }
        .last-timeline-element .vertical-timeline-element-content::after {
          content: none;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
