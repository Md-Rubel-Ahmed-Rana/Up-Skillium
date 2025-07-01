import PasswordChange from "@/components/passwordChange";
import DashboardLayout from "@/layout/DashboardLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const PasswordChangePage = () => {
  return (
    <>
      <PageMetadata
        title="Change Password - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <PasswordChange />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(PasswordChangePage);
