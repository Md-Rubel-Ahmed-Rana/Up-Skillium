import { useGetLoggedInUserQuery } from "@/features/auth";
import ProfileSkeleton from "@/skeletons/profile";
import { IUser } from "@/types/user.type";
import { Card } from "antd/lib";
import BasicInformation from "./BasicInformation";
import Educations from "./Educations";
import EmergencyContact from "./EmergencyContact";
import ProfileCard from "./ProfileCard";
import UserAddress from "./UserAddress";
import UserPermissions from "./UserPermissions";

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
            {/* personal educations  */}
            <Educations />
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
