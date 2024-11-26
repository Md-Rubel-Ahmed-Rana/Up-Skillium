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

type Props = {
  user: IUser;
  isLoading: boolean;
};

const ProfileInfo = ({ user, isLoading }: Props) => {
  const { data } = useGetLoggedInUserQuery({});
  const currentUser = data?.data as IUser;
  const isProfileOwner: boolean =
    currentUser?.id || currentUser?._id === user?.id || user?._id
      ? true
      : false;
  return (
    <>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="flex flex-col items-center lg:p-4">
          {/* User Profile Card */}
          <Card className="w-full">
            <ProfileCard user={user} isProfileOwner={isProfileOwner} />

            {/* Basic Information */}
            <BasicInformation user={user} isProfileOwner={isProfileOwner} />

            {/* Address Information */}
            <UserAddress user={user} isProfileOwner={isProfileOwner} />
            {/* Emergency Contact Information */}
            <EmergencyContact user={user} isProfileOwner={isProfileOwner} />

            {/* Permissions */}
            <UserPermissions user={user} />
            {/* personal educations  */}
            <Educations
              userId={user?.id || user?._id}
              isProfileOwner={isProfileOwner}
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
