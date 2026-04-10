import { useGetLoggedInUserQuery } from "@/features/auth";
import {
  useGetSingleLiveClassQuery,
  useUpdateLiveClassMutation,
} from "@/features/liveClass";
import LiveClassEditSkeleton from "@/skeletons/liveClassEditSkeleton";
import { IGetLiveClass, IUpdateLiveClass } from "@/types/liveClass.type";
import { IUser } from "@/types/user.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { Button, DatePicker, Form, Input, Select } from "antd/lib";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import SelectStudentsAttendees from "../createLiveClass/SelectStudentsAttendees";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const statuses = ["upcoming", "ongoing", "completed", "cancelled"];

const EditLiveClass = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query, push } = useRouter();
  const id = query?.id as string;
  const [reSelectStudent, setReSelectStudents] = useState(false);
  const { data, isLoading } = useGetSingleLiveClassQuery({ id });
  const liveClass = data?.data as IGetLiveClass;
  const [updateLiveClass, { isLoading: isUpdating }] =
    useUpdateLiveClassMutation();

  const [form] = Form.useForm();
  const [tags, setTags] = useState<string[]>(liveClass?.tags || []);
  const [topics, setTopics] = useState<string[]>(liveClass?.topics || []);

  const handleUpdateLiveClass = async (values: any) => {
    const payload: IUpdateLiveClass = {
      ...values,
      course: liveClass?.course?.id,
      instructor: liveClass?.instructor?.id,
      creator: liveClass?.creator?.id,
      startDateTime: values.dateRange[0].toISOString(),
      endDateTime: values.dateRange[1].toISOString(),
      tags,
      topics,
    };

    try {
      const response: any = await updateLiveClass({ id, data: payload });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        if (user?.role?.name === "admin") {
          push("/dashboard/live-classes/all");
        } else {
          push(`/dashboard/${values?.status}-live-classes`);
        }
      } else {
        handleValidationErrors(response);
        toast.error(
          response?.data?.message ||
            response?.data?.error.message ||
            response?.error?.message ||
            "Failed to update live class"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.error.message ||
          error?.message ||
          "Failed to update live class"
      );
    }
  };

  const handleTagChange = (value: string[]) => {
    setTags(value);
  };
  const handleTopicChange = (value: string[]) => {
    setTopics(value);
  };

  return (
    <>
      {isLoading ? (
        <LiveClassEditSkeleton />
      ) : (
        <div className="mt-3">
          <h1 className="text-2xl font-semibold mb-4">Edit Live Class</h1>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: liveClass?.title,
              description: liveClass?.description,
              meetingLink: liveClass?.meetingLink,
              tags: liveClass?.tags,
              topics: liveClass?.topics,
              status: liveClass?.status,
              dateRange: [
                liveClass?.startDateTime
                  ? dayjs(liveClass?.startDateTime)
                  : null,
                liveClass?.endDateTime ? dayjs(liveClass?.endDateTime) : null,
              ],
            }}
            onFinish={handleUpdateLiveClass}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter class title" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <TextArea placeholder="Enter class description" rows={4} />
            </Form.Item>
            {reSelectStudent ? (
              <SelectStudentsAttendees courseId={liveClass?.course?.id || ""} />
            ) : (
              <div className="mb-3">
                <h2 className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Students:</span>
                  <Button
                    onClick={() => setReSelectStudents(true)}
                    size="small"
                  >
                    Reselect
                  </Button>
                </h2>
                <div className="flex items-center flex-wrap gap-2 text-gray-500 text-sm ">
                  {liveClass?.students?.map((student) => (
                    <h5 className="border px-1 rounded-sm" key={student?.id}>
                      {student?.name}
                    </h5>
                  ))}
                </div>
              </div>
            )}

            <Form.Item
              label="Date & Time"
              name="dateRange"
              rules={[
                {
                  required: true,
                  message: "Please select start and end times",
                },
              ]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Meeting Link"
              name="meetingLink"
              rules={[
                { required: true, message: "Please enter the meeting link" },
              ]}
            >
              <Input placeholder="Enter meeting link" />
            </Form.Item>
            <Form.Item label="Recorded class link" name="recordingLink">
              <Input placeholder="Enter recorded class link" />
            </Form.Item>
            <Form.Item label="Topics" name="topics">
              <Select
                mode="tags"
                placeholder="Add topics"
                value={topics}
                onChange={handleTopicChange}
                className="w-full"
                tokenSeparators={[","]}
              >
                {topics.map((topic) => (
                  <Option key={topic}>{topic}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Tags" name="tags">
              <Select
                mode="tags"
                placeholder="Add tags"
                value={tags}
                onChange={handleTagChange}
                className="w-full"
                tokenSeparators={[","]}
              >
                {tags.map((tag) => (
                  <Option key={tag}>{tag}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Select status" }]}
            >
              <Select
                defaultActiveFirstOption={true}
                value={liveClass?.status}
                className="w-full"
              >
                {statuses.map((status) => (
                  <Option key={status}>{status}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={isUpdating}
                loading={isUpdating}
                iconPosition="end"
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditLiveClass;
