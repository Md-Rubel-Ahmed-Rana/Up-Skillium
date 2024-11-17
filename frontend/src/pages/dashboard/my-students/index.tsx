import MyStudents from "@/components/dashboard/my-students";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const MyStudentsPage = () => {
  return (
    <>
      <PageMetadata
        title="My Students - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <MyStudents />
    </>
  );
};

MyStudentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
export default MyStudentsPage;
