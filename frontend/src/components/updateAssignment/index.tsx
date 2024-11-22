import {
  useGetSingleAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "@/features/assignment";
import { IGetLesson as IAssignment } from "@/types/lesson.type";
import { Button, Form, Input } from "antd/lib";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateAssignment = () => {
  const { query, back } = useRouter();
  const id = query.id as string;
  const [form] = Form.useForm();
  const { data, isLoading } = useGetSingleAssignmentsQuery({ id });
  const assignment = data?.data as IAssignment;
  const [updateAssignment, { isLoading: isUpdating }] =
    useUpdateAssignmentMutation();

  const handleUpdateAssignment = async (values: IAssignment) => {
    try {
      const result: any = await updateAssignment({
        id: assignment?.id,
        data: {
          ...assignment,
          title: values?.title,
          content: values?.content,
        } as IAssignment,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Assignment updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update assignment."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update assignment. Error: ${error?.message}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <h2 className="text-lg lg:text-2xl font-semibold text-center">
            Assignment loading...
          </h2>
        </div>
      ) : (
        <>
          <div className="mt-3">
            <h2 className="text-lg lg:text-2xl font-semibold mb-3">
              Update Assignment
            </h2>
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={assignment}
            onFinish={handleUpdateAssignment}
            className="w-full p-4 shadow-md"
          >
            <Form.Item
              label="Title"
              name="title"
              className="w-full"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                onChange={(value) => form.setFieldValue("title", value)}
                placeholder="Please enter title"
                value={assignment?.title}
              />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Content is required" }]}
            >
              <ReactQuill
                theme="snow"
                placeholder="Write your content here..."
                className="bg-white rounded-lg shadow-sm"
                onChange={(value) => form.setFieldValue("content", value)}
                value={assignment?.content}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item>
                <Button
                  className="inline"
                  type="default"
                  htmlType="button"
                  size="large"
                  onClick={() => back()}
                >
                  Back
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className="inline"
                  type="primary"
                  htmlType="submit"
                  size="large"
                  iconPosition="end"
                  loading={isUpdating}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save changes"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      )}
    </>
  );
};

export default UpdateAssignment;
