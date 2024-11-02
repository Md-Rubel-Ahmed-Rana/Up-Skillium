import Profile from "@/components/dashboard/profile";
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
      <Profile />
    </>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProfilePage;
