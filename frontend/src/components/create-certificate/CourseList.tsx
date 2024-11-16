import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Button, Dropdown, MenuProps } from "antd/lib";

const CourseList = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];

  const courseList: MenuProps["items"] =
    courses?.map((course) => ({
      key: course?.id,
      label: <Button className="w-full">{course?.title}</Button>,
    })) || [];
  return (
    <Dropdown className="" menu={{ items: courseList }}>
      <Button className="font-semibold">Select Course</Button>
    </Dropdown>
  );
};

export default CourseList;
