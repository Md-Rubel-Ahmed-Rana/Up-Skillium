import { Divider } from "antd/lib";
import ProfileCardSkeleton from "./ProfileCard";
import InfoContainer from "./InfoContainer";

const ProfileSkeleton = () => {
  return (
    <div style={{ padding: "30px" }}>
      <ProfileCardSkeleton />
      <Divider />
      <InfoContainer cardTitle="Basic Information" />
      <Divider />
      <InfoContainer cardTitle="Address" />
      <Divider />
      <InfoContainer cardTitle="Emergency Contact" />
      <Divider />
      <InfoContainer cardTitle="Permissions" />
    </div>
  );
};

export default ProfileSkeleton;
