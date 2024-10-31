import CourseBasicDetails from "./courseBasicDetails";
import CourseOutline from "./courseOutline";

const CourseDetails = () => {
  return (
    <div className="pt-20 flex justify-between gap-5">
      <div className="w-2/3">
        <CourseBasicDetails />
      </div>
      <div className="w-1/3">
        <CourseOutline />
      </div>
    </div>
  );
};

export default CourseDetails;
