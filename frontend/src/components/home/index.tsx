import PopularCourse from "../popularCourses";
import StudentFacilities from "../StudentFacilities";
import StudentPanel from "../StudentPanel";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularCourse />
      <StudentFacilities />
      <StudentPanel />
    </div>
  );
};

export default Home;
