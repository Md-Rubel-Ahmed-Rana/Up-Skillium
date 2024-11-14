import DashboardLessonUpdate from "@/components/dashboardLessonUpdate";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DashboardLessonUpdatePage = () => {
  const { query } = useRouter();
  const lessonTitle = query?.lessonTitle as string;
  return (
    <>
      <PageMetadata
        title={`Edit lesson - ${lessonTitle || ""} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLessonUpdate />
    </>
  );
};

DashboardLessonUpdatePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default DashboardLessonUpdatePage;
