import PopularCourseContainer from "./PopularCourseContainer";
import PopularCourseHeader from "./PopularCourseHeader";

const PopularCourses = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600  text-white py-20 px-2 relative border-t border-gray-400">
      <div className="max-w-[1200px] w-full mx-auto">
        <PopularCourseHeader />
        <PopularCourseContainer />
      </div>
    </div>
  );
};

export default PopularCourses;
