/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useUpdateCourseIntroVideoMutation } from "@/features/course";
import { Modal, Upload } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

type Props = {
  courseId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const IntroVideoUpdate = ({ courseId, open, setOpen }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [updateVideo, { isLoading }] = useUpdateCourseIntroVideoMutation();

  const handleFileChange = (file: File) => {
    setNewVideo(file);
    const reader = new FileReader();
    reader.onload = () => {
      setVideoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleClose = () => setOpen(false);

  const handleUpdateVideo = async () => {
    try {
      const formData = new FormData();
      formData.append("file", newVideo as File);
      const result: any = await updateVideo({
        courseId: courseId,
        video: formData,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result.data.message || "Course intro video updated successfully!"
        );
        handleClose();
      } else {
        toast.error(
          result?.data?.error?.message ||
            result?.error?.data?.message ||
            result?.error?.message ||
            "Failed to update course image"
        );
      }
    } catch (error: any) {
      toast.error(
        `Failed to update course intro video . Error: ${error?.message}`
      );
    }
  };

  return (
    <Modal
      title="Change Intro Video"
      open={open}
      onOk={handleUpdateVideo}
      onCancel={handleClose}
      okText="Update Video"
      className="max-w-72 w-full"
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      closable={!isLoading}
      okButtonProps={{ disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      classNames={{ footer: "flex justify-between" }}
    >
      <div className="border-2 border-dotted rounded-md cursor-pointer flex justify-center items-center h-40 w-full">
        <Upload
          name="intro-video"
          className="h-full w-full flex justify-center items-center"
          showUploadList={false}
          beforeUpload={handleFileChange}
          accept="video/*"
        >
          {videoUrl ? (
            <video src={videoUrl} controls className="w-full h-40 object-cover">
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <FaPlus className="text-gray-500" />
              <div className="mt-2 text-sm text-gray-500">Upload Video</div>
            </div>
          )}
        </Upload>
      </div>
    </Modal>
  );
};

export default IntroVideoUpdate;
