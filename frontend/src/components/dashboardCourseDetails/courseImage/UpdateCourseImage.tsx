import { useUpdateCourseImageMutation } from "@/features/course";
import { Modal, Spin, Upload } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

type Props = {
  courseId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const UpdateCourseImage = ({ courseId, open, setOpen }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateImage, { isLoading }] = useUpdateCourseImageMutation();

  const handleFileChange = (file: File) => {
    setNewImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleClose = () => setOpen(false);

  const handleChangeCourseImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", newImage as File);
      const result: any = await updateImage({
        courseId: courseId,
        image: formData,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result.data.message || "Course image updated successfully!"
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
      toast.error(`Failed to update course image. Error: ${error?.message}`);
    }
  };

  return (
    <Modal
      title="Change Course Image"
      open={open}
      onOk={handleChangeCourseImage}
      onCancel={handleClose}
      okText="Update Image"
      cancelText="Cancel"
      className="max-w-72 w-full"
      confirmLoading={isLoading}
      maskClosable={!isLoading}
      closable={!isLoading}
      okButtonProps={{ disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      classNames={{ footer: "flex justify-between" }}
    >
      <div className="border rounded-md flex justify-center items-center h-40">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader flex justify-center items-center border"
            showUploadList={false}
            beforeUpload={handleFileChange}
            accept="image/*"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <FaPlus className="text-gray-500" />
                <div className="mt-2 text-sm text-gray-500">Upload</div>
              </div>
            )}
          </Upload>
        )}
      </div>
    </Modal>
  );
};

export default UpdateCourseImage;
