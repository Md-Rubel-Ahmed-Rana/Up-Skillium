import InstructorTeam from "@/components/team";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const InstructorTeamPage = () => {
  return (
    <>
      <PageMetadata
        title="Team - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorTeam />
    </>
  );
};

export default InstructorTeamPage;

InstructorTeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
