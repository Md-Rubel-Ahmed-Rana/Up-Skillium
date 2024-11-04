import Profile from "@/components/dashboard/profile";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import React, { ReactElement } from "react";

const ProfilePage = () => {
  return (
    <>
      <PageMetadata
        title="Profile - Up Skillium"
        description="This is user profile page"
        keywords="up-skillium"
      />
      <div className="max-w-[1400px] w-full mx-auto">
        <Profile />
      </div>
    </>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ProfilePage;
