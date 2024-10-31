import CourseBasicDetails from "./courseBasicDetails";
import CourseOutline from "./courseOutline";

const CourseDetails = () => {
  return (
    <div className="pt-20 flex lg:flex-row flex-col-reverse justify-between lg:gap-5 gap-20">
      <div className="w-full lg:w-2/3">
        <CourseBasicDetails />
      </div>
      <div className="w-full lg:w-1/3 lg:border-0 pb-10 lg:pb-0 border-b-2">
        <CourseOutline />
      </div>
    </div>
  );
};

export default CourseDetails;