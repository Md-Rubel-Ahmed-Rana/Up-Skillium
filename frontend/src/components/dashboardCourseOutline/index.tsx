import { useGetCourseOutlineByCourseIdQuery } from "@/features/courseOutline";
import { ICourseOutline } from "@/types/courseOutline.type";
import { useRouter } from "next/router";
import ModuleContainer from "./ModuleContainer";

const DashboardCourseOutlines = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetCourseOutlineByCourseIdQuery({ courseId });
  const outline = data?.data as ICourseOutline;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mt-3">
        Outline of the Course
      </h1>
      <h2 className="text-xl font-semibold text-center my-2 text-gray-600">
        {outline?.course?.title}
      </h2>
      <ModuleContainer modules={outline?.modules} />
    </div>
  );
};

export default DashboardCourseOutlines;
