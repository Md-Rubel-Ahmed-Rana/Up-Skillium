import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  return <ProfileInfo user={user} isLoading={isLoading} />;
};

export default Profile;
