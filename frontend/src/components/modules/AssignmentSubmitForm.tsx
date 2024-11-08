/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "antd/lib";
import dynamic from "next/dynamic";
import { ILesson } from "@/types/lesson.type";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import { useSubmitAssignmentMutation } from "@/features/assignmentSubmission";
import toast from "react-hot-toast";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  setIsSubmit: (value: boolean) => void;
  lesson: ILesson;
};

const AssignmentSubmitForm = ({ setIsSubmit, lesson }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { query } = useRouter();
  const courseId = query?.id as string;
  const [content, setContent] = useState("");
  const [submitAssignment, { isLoading }] = useSubmitAssignmentMutation();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      submission: {
        content: content,
      },
      lessonId: lesson?.id,
      userId: user?.id,
    };

    try {
      const result: any = await submitAssignment({
        formData,
        userId: user?.id,
        courseId,
        moduleId: lesson?.module,
        lessonId: lesson?.id,
      });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Assignment submitted successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            "Something went wrong to submit assignment"
        );
      }
    } catch (error: any) {
      toast.error(
        `Something went wrong to submit assignment. error: ${error?.message}`
      );
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Submit Your Assignment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Answer
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            theme="snow"
            placeholder="Write your answer here..."
            className="bg-white rounded-lg shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments (Optional)
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setIsSubmit(false)}
            htmlType="button"
            className="px-10"
            type="default"
            size="large"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="px-10"
            type="primary"
            size="large"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentSubmitForm;
