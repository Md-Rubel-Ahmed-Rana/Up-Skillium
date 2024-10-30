import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { Card } from "antd/lib";
import ProfileCard from "./ProfileCard";
import BasicInformation from "./BasicInformation";
import UserAddress from "./UserAddress";
import EmergencyContact from "./EmergencyContact";
import UserPermissions from "./UserPermissions";

const ProfileInfo = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center lg:p-4 lg:mt-10">
      {/* User Profile Card */}
      <Card className="w-full max-w-4xl mb-6   rounded-lg mt-10">
        <ProfileCard user={user} />

        {/* Basic Information */}
        <BasicInformation user={user} />

        {/* Address Information */}
        <UserAddress user={user} />
        {/* Emergency Contact Information */}
        <EmergencyContact user={user} />

        {/* Permissions */}
        <UserPermissions user={user} />
      </Card>
    </div>
  );
};

export default ProfileInfo;
