import OpportunitiesContainer from "./OpportunitiesContainer";
import OpportunitiesHeader from "./OpportunitiesHeader";

const Opportunities = () => {
  return (
    <div className="w-full py-20 relative px-2 lg:px-5">
      <div className="max-w-[1400px] w-full mx-auto">
        <OpportunitiesHeader />
        <OpportunitiesContainer />
      </div>
    </div>
  );
};

export default Opportunities;
