import ReviewAssignment from "@/components/reviewAssignment";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ReviewAssignmentPage = () => {
  const { query } = useRouter();
  const lessonTitle = query?.lessonTitle as string;
  return (
    <>
      <PageMetadata
        title={`Review assignment - ${lessonTitle || "title"} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ReviewAssignment />
    </>
  );
};

ReviewAssignmentPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(ReviewAssignmentPage);
