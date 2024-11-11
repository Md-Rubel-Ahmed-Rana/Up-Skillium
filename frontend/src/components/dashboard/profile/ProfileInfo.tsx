import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { Card } from "antd/lib";
import ProfileCard from "./ProfileCard";
import BasicInformation from "./BasicInformation";
import UserAddress from "./UserAddress";
import EmergencyContact from "./EmergencyContact";
import UserPermissions from "./UserPermissions";
import ProfileSkeleton from "@/skeletons/profile";

const ProfileInfo = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="flex flex-col items-center lg:p-4">
          {/* User Profile Card */}
          <Card className="w-full">
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
      )}
    </>
  );
};

export default ProfileInfo;
