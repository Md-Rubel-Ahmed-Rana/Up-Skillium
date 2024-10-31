import PageMetadata from "@/utils/PageMetadata";
import { Typography } from "antd/lib";
import { useRouter } from "next/router";
import React from "react";

const CourseDetailsPage = () => {
  const { query } = useRouter();
  return (
    <>
      <PageMetadata
        title={`Course Details - ${query?.courseTitle}`}
        description={(query?.description as string) || "course description"}
        keywords={query.tags as string}
      />
      <div className="min-h-screen flex justify-center items-center">
        <Typography.Title>{query?.courseTitle}</Typography.Title>
      </div>
    </>
  );
};

export default CourseDetailsPage;
