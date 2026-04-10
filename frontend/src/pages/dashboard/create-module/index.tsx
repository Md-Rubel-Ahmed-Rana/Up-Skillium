import CreateModule from "@/components/createModule";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const CreateModulePage = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseTitle;
  return (
    <>
      <PageMetadata
        title={`Create module - ${courseTitle || " "} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateModule />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CreateModulePage, ["admin", "instructor"])
);
