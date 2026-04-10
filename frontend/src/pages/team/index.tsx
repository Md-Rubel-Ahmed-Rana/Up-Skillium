import InstructorTeam from "@/components/team";
import baseApi from "@/features/api";
import RootLayout from "@/layout/RootLayout";
import { IUser } from "@/types/user.type";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

type Props = {
  teamMembers: IUser[];
};

const InstructorTeamPage = ({ teamMembers = [] }: Props) => {
  return (
    <>
      <PageMetadata
        title="Team - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <InstructorTeam teamMembers={teamMembers} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const teamRes = await fetch(`${baseApi}/user/team`);

    if (!teamRes.ok) {
      throw new Error("Failed to fetch students");
    }

    const teamData = await teamRes.json();

    return {
      props: {
        teamMembers: teamData?.data as IUser[],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        teamMembers: [],
      },
    };
  }
};

InstructorTeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default InstructorTeamPage;
