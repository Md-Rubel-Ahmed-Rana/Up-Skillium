import CourseOutlineEdit from "@/components/editCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const CourseOutlineEditPage = () => {
  const { query } = useRouter();
  const courseName = query?.courseName as string;
  return (
    <>
      <PageMetadata
        title={`Edit outline - ${courseName || "Course title"} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CourseOutlineEdit />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CourseOutlineEditPage, ["admin", "instructor"])
);
