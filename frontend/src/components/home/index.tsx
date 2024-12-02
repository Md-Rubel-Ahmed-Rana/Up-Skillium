import Banner from "./banner";
import HowItWorks from "./howItWorks";
import Opportunities from "./opportunities";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <OurServicesAndMissions />
      <PopularCourses />
      <Opportunities />
      <HowItWorks />
    </div>
  );
};

export default Home;
