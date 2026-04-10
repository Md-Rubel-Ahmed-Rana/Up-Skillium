import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetAllPublishedCoursesQuery,
  useGetInstructorCoursesQuery,
} from "@/features/course";
import { ICourse } from "@/types/course.type";
import { IUser } from "@/types/user.type";
import { Form, FormInstance, Select } from "antd/lib";

const { Option } = Select;

type Props = {
  form: FormInstance;
};

const CourseSelection = ({ form }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data: adminCourseData, isLoading: courseLoading1 } =
    useGetAllPublishedCoursesQuery({});
  const adminCourses = (adminCourseData?.data?.courses as ICourse[]) || [];
  const { data: instructorCourseData, isLoading: courseLoading2 } =
    useGetInstructorCoursesQuery({
      instructorId: user?.id,
    });
  const instructorCourses = (instructorCourseData?.data as ICourse[]) || [];
  const courses =
    user?.role?.name === "admin" ? adminCourses : instructorCourses;

  const handleSelectCourse = (courseId: string) => {
    form.setFieldValue("course", courseId);
  };
  return (
    <Form.Item
      name="course"
      label="Course"
      rules={[{ required: true, message: "Please select a course!" }]}
    >
      <Select
        onChange={handleSelectCourse}
        placeholder="Select your course"
        className="w-full"
        loading={courseLoading1 || courseLoading2}
      >
        {courses?.map((course) => (
          <Option key={course?.id} value={course?.id}>
            {course?.title}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CourseSelection;
