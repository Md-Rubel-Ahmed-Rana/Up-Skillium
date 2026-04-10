import { useGetModulesByCourseIdQuery } from "@/features/module";
import { ICourse } from "@/types/course.type";
import { IModule } from "@/types/module.type";
import { useRouter } from "next/router";
import ModulesContainer from "./modules";
import CourseDropDownList from "./CourseDropDownList";

const DashboardModulesLessons = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetModulesByCourseIdQuery({ courseId });
  const course = data?.data?.course as ICourse;
  const modules = data?.data?.modules as IModule[];
  return (
    <div className="pb-20">
      <h1 className="lg:text-2xl font-semibold text-center my-2">
        Course&apos;s Modules and Lessons
      </h1>
      <CourseDropDownList />
      <h2 className="lg:text-2xl font-semibold text-center text-gray-600 my-2">
        {course?.title}
      </h2>
      <div>
        <ModulesContainer modules={modules} />
      </div>
    </div>
  );
};

export default DashboardModulesLessons;
