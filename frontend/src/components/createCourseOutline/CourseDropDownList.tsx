import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import Link from "next/link";

const CourseDropDownList = () => {
  const { data } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];

  const courseList: MenuProps["items"] =
    courses?.map((course) => ({
      key: course?.id,
      label: (
        <Link
          href={`/dashboard/create-course-outline/?courseId=${course?.id}&courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        >
          {course?.title}
        </Link>
      ),
    })) || [];

  return (
    <div>
      <Dropdown menu={{ items: courseList }}>
        <Button className="font-semibold">Select another Course</Button>
      </Dropdown>
    </div>
  );
};

export default CourseDropDownList;
