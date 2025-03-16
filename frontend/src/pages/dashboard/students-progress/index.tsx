import StudentsProgress from "@/components/studentsProgress";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentsProgressPage = () => {
  return (
    <>
      <PageMetadata
        title="Students Progress - Up Skillium"
        description="This is user profile page"
        keywords="up-skillium"
      />
      <div className="max-w-[1400px] w-full mx-auto">
        <StudentsProgress />
      </div>
    </>
  );
};

StudentsProgressPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(StudentsProgressPage);
