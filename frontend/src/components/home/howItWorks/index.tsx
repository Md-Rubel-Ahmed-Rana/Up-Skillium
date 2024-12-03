import VerticalCards from "./VerticalCards";
import WorkHeader from "./WorkHeader";

const HowItWorks = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative border-t border-gray-400 px-2 lg:px-5">
      <WorkHeader />
      <VerticalCards />
    </div>
  );
};

export default HowItWorks;
