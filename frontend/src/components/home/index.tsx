import Banner from "./banner";
import HowItWorks from "./howItWorks";
import Opportunities from "./opportunities";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";
import TeamContainer from "./team";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <OurServicesAndMissions />
      <PopularCourses />
      <Opportunities />
      <HowItWorks />
      <TeamContainer />
    </div>
  );
};

export default Home;
