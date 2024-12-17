import { useGetCourseOutlineByCourseIdQuery } from "@/features/courseOutline";
import { CourseDetailsOutlineSkeleton } from "@/skeletons/courseDetailsSkeleton";
import { ICourseOutline } from "@/types/courseOutline.type";
import { useRouter } from "next/router";
import CourseCardForDetails from "./CourseCardForDetails";
import OutlineModules from "./OutlineModules";

const CourseOutline = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data, isLoading } = useGetCourseOutlineByCourseIdQuery({ courseId });
  const outline = data?.data as ICourseOutline;
  return (
    <>
      {!isLoading ? (
        <CourseDetailsOutlineSkeleton />
      ) : (
        <div className="p-2">
          <CourseCardForDetails course={outline?.course} />
          <OutlineModules modules={outline?.modules} />
        </div>
      )}
    </>
  );
};

export default CourseOutline;
