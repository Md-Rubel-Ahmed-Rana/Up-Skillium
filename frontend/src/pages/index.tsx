import Home from "@/components/home";
import baseApi from "@/features/api";
import RootLayout from "@/layout/RootLayout";
import { ICourse } from "@/types/course.type";
import PageMetadata from "@/utils/PageMetadata";
import Lenis from "@studio-freight/lenis";
import { ReactElement, useEffect } from "react";

const apiUrl = `${baseApi}/course/published/courses`;

type HomePageProps = {
  courses: ICourse[];
};

const HomePage = ({ courses }: HomePageProps) => {
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
      <Home courses={courses} />
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    const courses: ICourse[] = data?.data?.courses;

    return {
      props: {
        courses,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);

    return {
      props: {
        courses: [],
      },
    };
  }
};

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="10000px">{page}</RootLayout>;
};

export default HomePage;
