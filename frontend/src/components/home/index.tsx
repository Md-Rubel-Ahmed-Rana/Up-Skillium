import { ICourse } from "@/types/course.type";
import Banner from "./banner";
import HowItWorks from "./howItWorks";
import Opportunities from "./opportunities";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";
import SuccessStudents from "./successStudents";
import TeamContainer from "./team";

type Props = {
  courses: ICourse[];
};

const Home = ({ courses }: Props) => {
  return (
    <div className="w-full">
      <Banner />
      <OurServicesAndMissions />
      <PopularCourses courses={courses} />
      <Opportunities />
      <HowItWorks />
      <TeamContainer />
      <SuccessStudents />
    </div>
  );
};

export default Home;
