import PopularCourseContainer from "./PopularCourseContainer";
import PopularCourseHeader from "./PopularCourseHeader";

const PopularCourses = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  text-white py-20 relative border-t border-gray-400">
      <PopularCourseHeader />
      <PopularCourseContainer />
    </div>
  );
};

export default PopularCourses;
