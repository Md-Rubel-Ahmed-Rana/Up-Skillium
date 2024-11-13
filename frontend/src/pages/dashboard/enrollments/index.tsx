import StudentEnrollments from "@/components/dashboard/studentEnrollments";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const StudentEnrollmentPage = () => {
  return (
    <>
      <PageMetadata
        title="Enrollments - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <StudentEnrollments />
    </>
  );
};

StudentEnrollmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default StudentEnrollmentPage;
