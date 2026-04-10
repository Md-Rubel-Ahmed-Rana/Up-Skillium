import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetAllCoursesQuery,
  useGetInstructorCoursesQuery,
} from "@/features/course";
import { ICourse } from "@/types/course.type";
import { IUser } from "@/types/user.type";
import { Button, Dropdown, MenuProps } from "antd/lib";

type Props = {
  setSelectedCourse: (values: {
    id: string;
    name: string;
    technologies: string[];
  }) => void;
  setStudents: (students: IUser[]) => void;
};

const CourseList = ({ setSelectedCourse, setStudents }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: instructorCourse } = useGetInstructorCoursesQuery({
    instructorId: user?.id,
  });
  const instructorCourses = instructorCourse?.data as ICourse[];
  const { data } = useGetAllCoursesQuery({});
  const adminCourses = data?.data as ICourse[];

  const courses =
    user?.role?.name === "admin" ? adminCourses : instructorCourses;

  const handleSelectCourse = (course: ICourse) => {
    setSelectedCourse({
      id: course?.id,
      name: course?.title,
      technologies: course?.technologies,
    });
    setStudents(course?.students);
  };

  const courseList: MenuProps["items"] =
    courses?.map((course) => ({
      key: course?.id,
      label: (
        <Button onClick={() => handleSelectCourse(course)} className="w-full">
          {course?.title}
        </Button>
      ),
    })) || [];
  return (
    <Dropdown className="w-full" menu={{ items: courseList }}>
      <Button className="font-semibold">Select Course</Button>
    </Dropdown>
  );
};

export default CourseList;
