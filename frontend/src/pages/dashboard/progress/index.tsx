import StudentCourseProgress from "@/components/progress";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentsProgressPage = () => {
  return (
    <>
      <PageMetadata
        title="Course Progress - Up Skillium"
        description="This is user profile page"
        keywords="up-skillium"
      />
      <div className="max-w-[1400px] w-full mx-auto">
        <StudentCourseProgress />
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

export default StudentsProgressPage;
