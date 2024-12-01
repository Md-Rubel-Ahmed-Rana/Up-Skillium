import StudentPanel from "../StudentPanel";
import Banner from "./banner";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <OurServicesAndMissions />
      <PopularCourses />
      <StudentPanel />
    </div>
  );
};

export default Home;
