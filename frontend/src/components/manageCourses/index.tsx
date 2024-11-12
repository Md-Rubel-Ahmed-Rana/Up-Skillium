import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import ManageCourseCard from "./ManageCourseCard";
import { useState } from "react";
import LayoutSwitcher from "./LayoutSwitcher";

const ManageCourses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div className="mt-4 pb-20">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">Data loading...</h1>
        </div>
      ) : (
        <>
          {courses?.length > 0 ? (
            <>
              <LayoutSwitcher viewMode={viewMode} setViewMode={setViewMode} />
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => (
                    <ManageCourseCard course={course} key={course?.id} />
                  ))}
                </div>
              ) : (
                <div>Show as table</div>
              )}
            </>
          ) : (
            <div className="h-screen flex justify-center items-center">
              <h1 className="text-2xl font-bold">No course found!</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCourses;
