import Profile from "@/components/dashboard/profile";
import PageMetadata from "@/utils/PageMetadata";
import React from "react";

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

export default ProfilePage;
