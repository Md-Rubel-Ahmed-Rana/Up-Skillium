import MyStudents from "@/components/myStudents";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const MyStudentsPage = () => {
  return (
    <>
      <PageMetadata
        title="My Students - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <MyStudents />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(MyStudentsPage, ["instructor"])
);
