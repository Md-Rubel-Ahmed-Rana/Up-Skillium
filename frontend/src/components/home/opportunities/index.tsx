import OpportunitiesContainer from "./OpportunitiesContainer";
import OpportunitiesHeader from "./OpportunitiesHeader";

const Opportunities = () => {
  return (
    <div className="w-full  bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  text-white py-20 relative border-t border-gray-400 px-2 lg:px-5">
      <div className="max-w-[1400px] w-full mx-auto">
        <OpportunitiesHeader />
        <OpportunitiesContainer />
      </div>
    </div>
  );
};

export default Opportunities;
