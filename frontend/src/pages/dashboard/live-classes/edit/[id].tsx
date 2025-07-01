import EditLiveClass from "@/components/editLiveClass";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const EditLiveClassPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <PageMetadata
        title={`Edit - ${title || "title"} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <EditLiveClass />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(EditLiveClassPage, ["admin", "instructor"])
);
