import UserPasswordChange from "@/components/changeUserPassword";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const UserPasswordChangePage = () => {
  const { query } = useRouter();
  const userName = query?.name as string;
  const email = query?.email as string;
  return (
    <>
      <PageMetadata
        title={`Change Password - ${userName || ""} - ${
          email || ""
        } - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <UserPasswordChange />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(UserPasswordChangePage, ["admin"])
);
