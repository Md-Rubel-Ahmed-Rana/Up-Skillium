import ReviewAssignment from "@/components/reviewAssignment";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

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
      <DashboardLayout>
        <ReviewAssignment />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(ReviewAssignmentPage, ["instructor", "admin"])
);
