import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useState } from "react";
import LayoutSwitcher from "./LayoutSwitcher";
import ManageCourseGrid from "./ManageCourseGrid";
import ManageCourseTable from "./ManageCourseTable";

const ManageCourses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div className="mt-4 pb-20 w-full">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">Data loading...</h1>
        </div>
      ) : (
        <>
          <LayoutSwitcher viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === "grid" ? (
            <ManageCourseGrid courses={courses} />
          ) : (
            <ManageCourseTable courses={courses} />
          )}
        </>
      )}
    </div>
  );
};

export default ManageCourses;
