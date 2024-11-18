import { Button, Form } from "antd/lib";
import CourseLevelDurationStatusCategory from "./CourseLevelDurationStatusCategory";
import CourseMedia from "./CourseMedia";
import CoursePrices from "./CoursePrices";
import CourseTagsTechs from "./CourseTagsTechs";
import CourseTitleDescription from "./CourseTitleDescription";

const CreateCourse = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
    // Add logic to handle form submission
  };

  return (
    <div className="p-4 shadow-md rounded-lg mt-3 mb-20">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Create New Course
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
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
          >
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCourse;
