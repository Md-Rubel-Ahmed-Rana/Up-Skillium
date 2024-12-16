import { useGetAllCoursesQuery } from "@/features/course";
import { useGetAllCourseOutlinesQuery } from "@/features/courseOutline";
import { ICourse } from "@/types/course.type";
import { ICourseOutline } from "@/types/courseOutline.type";
import CourseOutlineTable from "../outlines";

const CourseOutlines = () => {
  const { data, isLoading } = useGetAllCourseOutlinesQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});
  const courses = courseData?.data as ICourse[];
  const courseOutlines = data?.data as ICourseOutline[];

  return (
    <div className="lg:p-5 px-2 pb-20">
      <h1 className="text-2xl font-semibold mb-5">All Course Outlines</h1>
      <div className="overflow-x-auto">
        <CourseOutlineTable
          courses={courses}
          isLoading={isLoading}
          outlines={courseOutlines}
        />
      </div>
    </div>
  );
};

export default CourseOutlines;
