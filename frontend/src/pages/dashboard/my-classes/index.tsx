import MyClasses from "@/components/myClasses";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import React, { ReactElement } from "react";

const MyClassesPage = () => {
  return (
    <>
      <PageMetadata
        title="My Classes - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <MyClasses />
    </>
  );
};

MyClassesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default MyClassesPage;
