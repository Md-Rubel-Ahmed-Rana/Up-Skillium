import Profile from "@/components/profile";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";

const TestDashboardLayout = dynamic(import("@/layout/TestDashboardLayout"), {
  ssr: false,
});

const ProfilePage = () => {
  return (
    <>
      <PageMetadata
        title="Profile - Up Skillium"
        description="This is user profile page"
        keywords="up-skillium"
      />
      <TestDashboardLayout>
        <Profile />
      </TestDashboardLayout>
    </>
  );
};

export default isAuthenticate(ProfilePage);
