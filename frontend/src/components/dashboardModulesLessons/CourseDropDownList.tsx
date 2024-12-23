import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetAllCoursesQuery,
  useGetInstructorCoursesQuery,
} from "@/features/course";
import { ICourse } from "@/types/course.type";
import { IUser } from "@/types/user.type";
import { Button, Dropdown, MenuProps } from "antd/lib";
import Link from "next/link";

const CourseDropDownList = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: instructorCourse } = useGetInstructorCoursesQuery({
    instructorId: user?.id,
  });
  const instructorCourses = instructorCourse?.data as ICourse[];
  const { data } = useGetAllCoursesQuery({});
  const adminCourses = data?.data as ICourse[];

  const adminCourseList: MenuProps["items"] =
    adminCourses?.map((course) => ({
      key: course?.id,
      label: (
        <Link
          href={`/dashboard/course/modules-lessons/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        >
          {course?.title}
        </Link>
      ),
    })) || [];

  const instructorCourseList: MenuProps["items"] =
    instructorCourses?.map((course) => ({
      key: course?.id,
      label: (
        <Link
          href={`/dashboard/course/modules-lessons/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        >
          {course?.title}
        </Link>
      ),
    })) || [];

  const courses =
    user?.role?.name === "admin" ? adminCourseList : instructorCourseList;

  return (
    <div className="lg:w-1/2 w-full mx-auto">
      <Dropdown className="w-full" menu={{ items: courses }}>
        <Button className="font-semibold">Select another Course</Button>
      </Dropdown>
    </div>
  );
};

export default CourseDropDownList;
