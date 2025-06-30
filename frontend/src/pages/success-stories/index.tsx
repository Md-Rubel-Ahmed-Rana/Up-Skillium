import Alumni from "@/components/alumni";
import baseApi from "@/features/api";
import RootLayout from "@/layout/RootLayout";
import { IUser } from "@/types/user.type";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

type Props = {
  students: IUser[];
};

const AlumniPage = ({ students }: Props) => {
  return (
    <>
      <PageMetadata
        title="Alumni - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Alumni students={students} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const studentRes = await fetch(`${baseApi}/user/students`);

    if (!studentRes.ok) {
      throw new Error("Failed to fetch students");
    }

    const studentData = await studentRes.json();

    return {
      props: {
        students: studentData?.data as IUser[],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        students: [],
      },
    };
  }
};

AlumniPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default AlumniPage;
