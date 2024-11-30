import PopularCourse from "../popularCourses";
import StudentPanel from "../StudentPanel";
import Banner from "./banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularCourse />
      <StudentPanel />
    </div>
  );
};

export default Home;
