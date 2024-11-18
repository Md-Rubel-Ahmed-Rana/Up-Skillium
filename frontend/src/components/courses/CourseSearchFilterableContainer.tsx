import { useLazyGetAllPublishedCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useEffect, useState } from "react";
import CourseContainer from "./CourseContainer";
import CourseSearch from "./CourseSearch";

const CourseSearchFilterableContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const [trigger, { data, isLoading }] = useLazyGetAllPublishedCoursesQuery({
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    trigger({ searchText: debouncedSearchValue });
  }, [debouncedSearchValue, trigger]);

  const courses = (data?.data as ICourse[]) || [];

  return (
    <>
      <CourseSearch setSearchValue={setSearchValue} />
      <CourseContainer courses={courses} isLoading={isLoading} />
    </>
  );
};

export default CourseSearchFilterableContainer;
