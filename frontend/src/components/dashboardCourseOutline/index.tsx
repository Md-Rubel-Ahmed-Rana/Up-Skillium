import { useGetCourseOutlineByCourseIdQuery } from "@/features/courseOutline";
import { ICourseOutline } from "@/types/courseOutline.type";
import { useRouter } from "next/router";
import ModuleContainer from "./ModuleContainer";
import CourseDropDownList from "./CourseDropDownList";

const DashboardCourseOutlines = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetCourseOutlineByCourseIdQuery({ courseId });
  const outline = data?.data as ICourseOutline;
  return (
    <div className="pb-20">
      <h1 className="text-2xl font-semibold text-center my-2">
        Outline of the Course
      </h1>
      <CourseDropDownList />
      <h2 className="text-xl font-semibold text-center my-2 text-gray-600">
        {outline?.course?.title}
      </h2>
      <ModuleContainer
        modules={outline?.modules}
        courseId={outline?.course?.id}
      />
    </div>
  );
};

export default DashboardCourseOutlines;
