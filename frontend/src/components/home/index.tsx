import PopularCourse from "../popularCourses";
import StudentPanel from "../StudentPanel";
import Banner from "./banner";
import OurServicesAndMissions from "./servicesMissions";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <OurServicesAndMissions />
      <PopularCourse />
      <StudentPanel />
    </div>
  );
};

export default Home;
