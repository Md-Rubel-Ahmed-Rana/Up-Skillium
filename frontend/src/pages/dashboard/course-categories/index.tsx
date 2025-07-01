import CourseCategories from "@/components/courseCategories";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CourseCategoriesPage = () => {
  return (
    <>
      <PageMetadata
        title="Course Categories - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CourseCategories />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CourseCategoriesPage, ["admin"])
);
