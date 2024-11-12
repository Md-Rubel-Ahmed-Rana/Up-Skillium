/* eslint-disable @next/next/no-img-element */
import { Modal, Upload } from "antd/lib";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  courseId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const UpdateCourseImage = ({ courseId, open, setOpen }: Props) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [newImage, setNewImage] = useState<File | null>(null);

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

  const handleChangeCourseImage = () => {
    // Image upload to server logic will be applied
    console.log(newImage, courseId);
  };

  return (
    <Modal
      title="Change Course Image"
      open={open}
      onOk={handleChangeCourseImage}
      onCancel={handleClose}
      okText="Update Image"
      className="max-w-72 w-full"
    >
      <div className="border rounded-md flex justify-center items-center h-40">
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
      </div>
    </Modal>
  );
};

export default UpdateCourseImage;
