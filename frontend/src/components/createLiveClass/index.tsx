import { useGetLoggedInUserQuery } from "@/features/auth";
import { useCreateLiveClassMutation } from "@/features/liveClass";
import { ICreateLiveClass } from "@/types/liveClass.type";
import { IUser } from "@/types/user.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { Button, Form } from "antd/lib";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import CourseSelection from "./CourseSelection";
import SelectDateTimeDuration from "./SelectDateTimeDuration";
import SelectInstructor from "./SelectInstructor";
import SelectMeetLink from "./SelectMeetLink";
import TitleDescription from "./TitleDescription";
import TopicsAndTags from "./TopicsAndTags";

const CreateLiveClass = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const [form] = Form.useForm<ICreateLiveClass>();
  const [createLive, { isLoading }] = useCreateLiveClassMutation();

  const handleSubmit = (values: any) => {
    const startDateTime = dayjs(values.dateRange[0]).toISOString();
    const endDateTime = dayjs(values.dateRange[1]).toISOString();

    const duration = dayjs(values.dateRange[1]).diff(
      values.dateRange[0],
      "minute"
    );
    delete values?.dateRange;
    const formData: ICreateLiveClass = {
      ...values,
      startDateTime,
      endDateTime,
      duration,
      creator: user?.id,
      meetingLink: "",
    };
    if (user?.role?.name !== "admin") {
      formData.instructor = user?.id;
    }

    handleCreateLiveClass(formData);
  };

  const handleCreateLiveClass = async (formData: ICreateLiveClass) => {
    try {
      const result: any = await createLive({ data: formData });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Live class created successfully!"
        );
        form.resetFields();
      } else {
        handleValidationErrors(result);
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create live class."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create live class. Error: ${error?.message}`);
    }
  };

  return (
    <div className="mt-3 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-6">
        Create Live Class
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ topics: [], tags: [] }}
      >
        <TitleDescription />
        <CourseSelection form={form} />
        {user?.role?.name === "admin" && <SelectInstructor form={form} />}

        <SelectDateTimeDuration />

        <SelectMeetLink />

        <TopicsAndTags />

        <Form.Item>
          <Button
            disabled={isLoading}
            iconPosition="end"
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            {isLoading ? "Creating..." : " Create Live Class"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateLiveClass;
