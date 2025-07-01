import UpdateAssignment from "@/components/updateAssignment";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const UpdateAssignmentPage = () => {
  const { query } = useRouter();
  const title = query?.title;
  return (
    <>
      <PageMetadata
        title={`Update Assignment - ${title || " "} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <UpdateAssignment />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(UpdateAssignmentPage, ["admin", "instructor"])
);
