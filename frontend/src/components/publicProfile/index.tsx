import { useGetSingleUserQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import ProfileInfo from "../profile/ProfileInfo";

const PublicProfile = () => {
  const { query } = useRouter();
  const userId = query?.userId as string;
  const { data, isLoading } = useGetSingleUserQuery({ userId });
  const user = data?.data as IUser;
  return <ProfileInfo user={user} isLoading={isLoading} />;
};

export default PublicProfile;
