import {  useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import PopularCard from "./PopularCard";



const PopularCourseContainer = () => {

  const {data} = useGetAllCoursesQuery({searchText: "popular"}) 



      const courses = (data?.data as ICourse[]) || [];
      console.log(courses);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">
          {courses?.map(course => <PopularCard key={course.id} course={course} />)}
        </div>
    );
};

export default PopularCourseContainer;