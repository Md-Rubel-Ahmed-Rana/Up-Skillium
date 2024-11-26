import { useLazyGetAllPublishedCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useEffect, useState } from "react";
import CourseFilter from "./CourseFilter";
import CourseGridContainer from "./CourseGridContainer";
import CoursePagination from "./CoursePagination";
import CourseSearch from "./CourseSearch";

const CourseContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 6 }
  );

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
      page: pagination?.page,
      limit: pagination?.limit,
      filters: {
        category: filters.category || undefined,
        level: filters.level || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      },
    });
  }, [
    debouncedSearchValue,
    filters,
    pagination?.limit,
    pagination?.page,
    trigger,
  ]);

  const courses = ((data?.data || data?.data?.courses) as ICourse[]) || [];
  const totalCourses = (data?.data?.totalCourse || courses?.length) as number;

  return (
    <>
      <CourseSearch setSearchValue={setSearchValue} />
      <CourseFilter filters={filters} setFilters={setFilters} />
      <CourseGridContainer courses={courses} isLoading={isLoading} />
      <CoursePagination
        totalCourse={totalCourses}
        setPagination={setPagination}
      />
    </>
  );
};

export default CourseContainer;
