import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Button, Dropdown, MenuProps } from "antd/lib";

type Props = {
  setSelectedCourse: (values: {
    id: string;
    name: string;
    technologies: string[];
  }) => void;
};

const CourseList = ({ setSelectedCourse }: Props) => {
  const { data } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];

  const handleSelectCourse = (course: ICourse) => {
    setSelectedCourse({
      id: course?.id,
      name: course?.title,
      technologies: course?.technologies,
    });
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
