import DashboardLessonUpdate from "@/components/dashboardLessonUpdate";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

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
      <DashboardLayout>
        <DashboardLessonUpdate />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(DashboardLessonUpdatePage, ["admin", "instructor"])
);
