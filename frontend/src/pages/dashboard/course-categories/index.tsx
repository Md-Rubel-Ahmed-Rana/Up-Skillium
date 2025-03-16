import CourseCategories from "@/components/courseCategories";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const CourseCategoriesPage = () => {
  return (
    <>
      <PageMetadata
        title="Course Categories - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <CourseCategories />
    </>
  );
};

CourseCategoriesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(CourseCategoriesPage);
