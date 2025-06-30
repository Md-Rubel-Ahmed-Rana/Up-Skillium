import Home from "@/components/home";
import baseApi from "@/features/api";
import RootLayout from "@/layout/RootLayout";
import { IDocument } from "@/types/common";
import { ICourse } from "@/types/course.type";
import { IReview } from "@/types/review.type";
import { IUser } from "@/types/user.type";
import PageMetadata from "@/utils/PageMetadata";
import Lenis from "@studio-freight/lenis";
import { ReactElement, useEffect } from "react";

type HomePageProps = {
  courses: ICourse[];
  documents: IDocument[];
  teamMembers: IUser[];
  students: IUser[];
  reviews: IReview[];
};

const HomePage = ({
  courses,
  documents,
  students,
  teamMembers,
  reviews,
}: HomePageProps) => {
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  });

  return (
    <>
      <PageMetadata
        title="Home - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Home
        courses={courses}
        documents={documents}
        students={students}
        teamMembers={teamMembers}
        reviews={reviews}
      />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const [courseRes, documentRes, teamRes, studentRes, reviewRes] =
      await Promise.all([
        fetch(`${baseApi}/course/published/courses`),
        fetch(`${baseApi}/common/documents`),
        fetch(`${baseApi}/user/team`),
        fetch(`${baseApi}/user/students`),
        fetch(`${baseApi}/review`),
      ]);

    if (
      !courseRes.ok ||
      !documentRes.ok ||
      !teamRes.ok ||
      !studentRes.ok ||
      !reviewRes.ok
    ) {
      throw new Error("One or more requests failed");
    }

    const [courseData, documentData, teamData, studentData, reviewData] =
      await Promise.all([
        courseRes.json(),
        documentRes.json(),
        teamRes.json(),
        studentRes.json(),
        reviewRes.json(),
      ]);

    return {
      props: {
        courses: courseData?.data?.courses as ICourse[],
        documents: documentData?.data as IDocument[],
        teamMembers: teamData?.data as IUser[],
        students: studentData?.data as IUser[],
        reviews: reviewData?.data as IReview[],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        courses: [],
        documents: [],
        teamMembers: [],
        students: [],
        reviews: [],
      },
    };
  }
};

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};

export default HomePage;
