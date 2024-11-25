import { useLazyGetAllPublishedCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useEffect, useState } from "react";
import CourseFilter from "./CourseFilter";
import CourseGridContainer from "./CourseGridContainer";
import CourseSearch from "./CourseSearch";

const CourseContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [filters, setFilters] = useState<Record<string, any>>({});

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
    trigger({
      searchText: debouncedSearchValue,
      filters: {
        category: filters.category || undefined,
        level: filters.level || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      },
    });
  }, [debouncedSearchValue, filters, trigger]);

  const courses = (data?.data as ICourse[]) || [];

  return (
    <>
      <CourseSearch setSearchValue={setSearchValue} />
      <CourseFilter filters={filters} setFilters={setFilters} />
      <CourseGridContainer courses={courses} isLoading={isLoading} />
    </>
  );
};

export default CourseContainer;
