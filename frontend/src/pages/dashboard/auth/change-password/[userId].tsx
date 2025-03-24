import UserPasswordChange from "@/components/changeUserPassword";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

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
      <UserPasswordChange />
    </>
  );
};

UserPasswordChangePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default UserPasswordChangePage;
