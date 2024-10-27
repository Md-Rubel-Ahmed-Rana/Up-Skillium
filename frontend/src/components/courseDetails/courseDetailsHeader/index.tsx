import { FaReact, FaHtml5 } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const CourseDetailsHeader = () => {
  return (
    <div className="pt-20 px-4 lg:px-10">
      <div className="flex flex-col gap-0 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <FaReact className="text-5xl md:text-6xl animate-bounce mr-4" />
          <h1 className="text-2xl md:text-4xl font-bold leading-snug md:leading-tight mt-4 md:mt-0 text-center md:text-left">
            Breakthroughs Begin with Learning, Reach for the Future You Deserve
          </h1>
          <RiTailwindCssFill className="text-5xl md:text-6xl animate-pulse ml-4" />
        </div>

        <div className="flex flex-col md:flex-row items-center p-6 border-t border-opacity-50 border-gray-200">
          <FaHtml5 className="text-5xl md:text-6xl animate-pulse mr-4" />
          <p className="text-lg md:text-xl leading-relaxed text-center md:text-left">
            Master MongoDB, Express, React, and Node.js to build efficient,
            full-stack web applications from scratch. Connect front-end and
            back-end seamlessly for a smooth user experience.
          </p>
          <FaReact className="text-5xl md:text-6xl animate-bounce mr-4" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsHeader;
