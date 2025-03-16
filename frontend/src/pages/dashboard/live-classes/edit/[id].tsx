import EditLiveClass from "@/components/editLiveClass";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

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
      <EditLiveClass />
    </>
  );
};

EditLiveClassPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(EditLiveClassPage);
