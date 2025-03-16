import CourseOutlineEdit from "@/components/editCourseOutline";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

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
      <CourseOutlineEdit />
    </>
  );
};

CourseOutlineEditPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(CourseOutlineEditPage);
