import Profile from "@/components/profile";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";

const DashboardLayout = dynamic(import("@/layout/DashboardLayout"), {
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
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(ProfilePage);
