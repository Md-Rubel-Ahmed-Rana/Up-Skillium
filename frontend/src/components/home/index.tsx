import Banner from "./banner";
import HowItWorks from "./howItWorks";
import Opportunities from "./opportunities";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";
import SuccessStudents from "./successStudents";
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
      <SuccessStudents />
    </div>
  );
};

export default Home;
