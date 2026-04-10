import { useCreateCourseMutation } from "@/features/course";
import { ICreateCourse } from "@/types/course.type";
import { Button, Form } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import CourseLevelDurationStatusCategory from "./CourseLevelDurationStatusCategory";
import CourseMedia from "./CourseMedia";
import CoursePrices from "./CoursePrices";
import CourseTagsTechs from "./CourseTagsTechs";
import CourseTitleDescription from "./CourseTitleDescription";

const CreateCourse = () => {
  const [form] = Form.useForm();
  const [courseCreate, { isLoading }] = useCreateCourseMutation();
  const router = useRouter();

  const handleSubmitCourse = async (values: any) => {
    const formData = new FormData();
    const courseData: ICreateCourse = {
      ...values,
      image: values?.image[0]?.originFileObj as File,
      introductoryVideo: values?.introductoryVideo[0]?.originFileObj as File,
    };
    for (const key in courseData) {
      const value = courseData[key];

      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    }
    await handleCreateCourse(formData);
  };

  const handleCreateCourse = async (data: FormData) => {
    try {
      const result: any = await courseCreate({ course: data });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Course created successfully!");
        router.push("/dashboard/manage-courses");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create course."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create course. Error: ${error?.message}`);
    }
  };

  return (
    <div className="p-4 shadow-md rounded-lg mt-3 mb-20">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Create New Course
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitCourse}
        className="space-y-6"
      >
        {/* Title and Description */}
        <CourseTitleDescription />

        {/* Level, Duration, Status and Category */}
        <CourseLevelDurationStatusCategory />

        {/* Image and introductory video  */}
        <CourseMedia />

        {/* Price */}
        <CoursePrices form={form} />

        {/* Tags and Technologies */}
        <CourseTagsTechs />

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Creating course..." : "Create Course"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCourse;
