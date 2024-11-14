/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from "@/types/lesson.type";
import { Form, Input, Button } from "antd/lib";
import { useEffect, useState } from "react";
import LessonVideoUploadModal from "./LessonVideoUploadModal";

type Props = {
  lesson: ILesson;
};

const VideoLessonUpdate = ({ lesson }: Props) => {
  const [form] = Form.useForm();
  const [uploadVideo, setUploadVideo] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  console.log(newVideoUrl);

  const handleUpdateVideoLesson = (values: any) => {
    console.log("Updated Data:", values);
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

      <Button onClick={() => setUploadVideo(true)}>Change video</Button>
      <LessonVideoUploadModal
        open={uploadVideo}
        setOpen={setUploadVideo}
        setVideoUrl={setNewVideoUrl}
      />

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
        <Input type="number" placeholder="Enter video length in seconds" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Update Lesson
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VideoLessonUpdate;
