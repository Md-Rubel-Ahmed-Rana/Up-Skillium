import InstructorReviewViews from "@/components/instructorReviewViews";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const ReviewsPage = () => {
  return (
    <>
      <PageMetadata
        title="Reviews - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <InstructorReviewViews />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(ReviewsPage, ["instructor"]));
