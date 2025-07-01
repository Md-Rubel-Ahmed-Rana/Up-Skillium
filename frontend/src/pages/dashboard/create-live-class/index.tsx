import CreateLiveClass from "@/components/createLiveClass";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const CreateLiveClassPage = () => {
  return (
    <>
      <PageMetadata
        title={`Create live class - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <CreateLiveClass />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(CreateLiveClassPage, ["admin", "instructor"])
);
