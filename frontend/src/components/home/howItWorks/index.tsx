import VerticalCards from "./VerticalCards";
import WorkHeader from "./WorkHeader";

const HowItWorks = () => {
  return (
    <div className="max-w-[1230px] w-full mx-auto overflow-hidden flex flex-col gap-10 py-20 relative px-2 lg:px-5">
      <WorkHeader />
      <VerticalCards />
    </div>
  );
};

export default HowItWorks;
