import { IDocument } from "@/types/common";
import { ICourse } from "@/types/course.type";
import { IReview } from "@/types/review.type";
import { IUser } from "@/types/user.type";
import Banner from "./banner";
import HowItWorks from "./howItWorks";
import Marquee from "./marquee";
import Opportunities from "./opportunities";
import PopularCourses from "./popularCourses";
import OurServicesAndMissions from "./servicesMissions";
import StudentReviews from "./studentReviews";
import SuccessStudents from "./successStudents";
import TeamContainer from "./team";

type Props = {
  courses: ICourse[];
  documents: IDocument[];
  teamMembers: IUser[];
  students: IUser[];
  reviews: IReview[];
};

const Home = ({
  courses = [],
  documents = [],
  students = [],
  teamMembers = [],
  reviews,
}: Props) => {
  return (
    <div className="w-full">
      <Banner />
      <Marquee documents={documents} />
      <OurServicesAndMissions />
      <PopularCourses courses={courses} />
      <Opportunities />
      <HowItWorks />
      <TeamContainer teamMembers={teamMembers} />
      <StudentReviews reviews={reviews} />
      <SuccessStudents students={students} />
    </div>
  );
};

export default Home;
