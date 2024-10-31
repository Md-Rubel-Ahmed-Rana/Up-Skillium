import { useLazyGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import CourseSearch from "./CourseSearch";
import CourseContainer from "./CourseContainer";
import { useState, useEffect } from "react";

const CourseSearchFilterableContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const [trigger, { data, isLoading }] = useLazyGetAllCoursesQuery({
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
