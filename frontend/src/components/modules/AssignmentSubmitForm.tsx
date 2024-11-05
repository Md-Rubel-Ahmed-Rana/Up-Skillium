import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  setIsSubmit: (value: boolean) => void;
};

const AssignmentSubmitForm = ({ setIsSubmit }: Props) => {
  const [content, setContent] = useState("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Content:", content);
    toast.success("Feature coming very soon!");
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
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="px-10"
            type="primary"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentSubmitForm;
