import { useUpdateLessonMutation } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Button, Form, Input } from "antd/lib";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LessonVideoUploadModal from "./LessonVideoUploadModal";

type Props = {
  lesson: ILesson;
};

const VideoLessonUpdate = ({ lesson }: Props) => {
  const [form] = Form.useForm();
  const [uploadVideo, setUploadVideo] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();

  const handleUpdateVideoLesson = async (values: ILesson) => {
    const newData: ILesson = {
      ...lesson,
      title: values?.title,
      serial: Number(values?.serial),
      videoUrl: values?.videoUrl,
      videoLength: Number(values?.videoLength),
    };

    try {
      const result: any = await updateLesson({
        lessonId: lesson?.id,
        data: newData,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Lesson was updated successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update lesson"
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update lesson. Error: ${error?.message}`);
    }
  };

  useEffect(() => {
    if (lesson) {
      form.setFieldsValue({
        title: lesson.title,
        serial: lesson.serial,
        videoUrl: lesson.videoUrl,
        videoLength: lesson.videoLength,
      });
    }
  }, [lesson, form]);

  return (
    <>
      <Form
        form={form}
        onFinish={handleUpdateVideoLesson}
        layout="vertical"
        className="space-y-4 border p-4 rounded-md"
      >
        <Form.Item
          label="Lesson Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter lesson title" />
        </Form.Item>

        <Form.Item
          label="Serial"
          name="serial"
          rules={[
            { required: true, message: "Serial is required" },
            {
              type: "number",
              message: "Serial must be a number",
              transform: (value) => Number(value),
            },
          ]}
        >
          <Input type="number" placeholder="Enter lesson serial" />
        </Form.Item>

        <Form.Item
          label="Video URL"
          name="videoUrl"
          rules={[{ required: true, message: "Video URL is required" }]}
        >
          <Input.TextArea placeholder="Enter video URL" />
        </Form.Item>

        <Button
          type="default"
          htmlType="button"
          onClick={() => setUploadVideo(true)}
        >
          Change video
        </Button>

        <Form.Item
          label="Video Length (Minutes)"
          name="videoLength"
          rules={[
            { required: true, message: "Video length is required" },
            {
              type: "number",
              message: "Video length must be a number",
              transform: (value) => Number(value),
            },
          ]}
        >
          <Input type="number" placeholder="Enter video length in minutes" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            disabled={isLoading}
            loading={isLoading}
            iconPosition="end"
            htmlType="submit"
            className="w-full"
          >
            {isLoading ? "Updating..." : " Update Lesson"}
          </Button>
        </Form.Item>
      </Form>
      <LessonVideoUploadModal
        open={uploadVideo}
        setOpen={setUploadVideo}
        setVideoUrl={setNewVideoUrl}
      />
    </>
  );
};

export default VideoLessonUpdate;
