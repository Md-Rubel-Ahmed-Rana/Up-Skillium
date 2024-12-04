import PublicProfile from "@/components/publicProfile";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const PublicProfilePage = () => {
  const { query } = useRouter();
  const userName = query?.name as string;
  return (
    <>
      <PageMetadata
        title={`Profile - ${userName || ""} - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <PublicProfile />
    </>
  );
};

PublicProfilePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default PublicProfilePage;
