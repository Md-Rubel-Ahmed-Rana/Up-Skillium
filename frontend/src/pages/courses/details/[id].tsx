import CourseDetails from "@/components/courseDetails";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CourseDetailsPage = () => {
  const { query } = useRouter();
  return (
    <>
      <PageMetadata
        title={`Course Details - ${query?.courseTitle || ""}`}
        description={(query?.description as string) || "course description"}
        keywords={query.tags as string}
      />
      <div className="max-w-[1200px] mx-auto">
        <CourseDetails />
      </div>
    </>
  );
};

CourseDetailsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default CourseDetailsPage;
