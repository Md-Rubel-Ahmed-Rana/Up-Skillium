import { Button, Modal, Upload, UploadProps } from "antd/lib";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useChangeProfilePictureMutation } from "@/features/user";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  userId: string;
};

const ChangeProfilePicture: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  userId,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [change, { isLoading }] = useChangeProfilePictureMutation();

  const handleCloseModal = () => {
    setIsOpen(false);
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl("");
    }
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    const selectedFile = info.file as any;
    if (selectedFile) {
      setFile(selectedFile);
      const newImageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(newImageUrl);
    }
  };

  const handleChangeProfilePicture = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response: any = await change({
          id: userId,
          image: formData,
        });
        if (response?.data?.statusCode === 200) {
          toast.success(
            response?.data?.message || "Profile picture updated successfully",
          );
          setIsOpen(false);
          setFile(null);
          setImageUrl("");
        } else {
          toast.error(
            response?.data?.message ||
              response?.error.data?.message ||
              "Profile picture was not changed. Please try again!",
          );
          setIsOpen(false);
          setFile(null);
          setImageUrl("");
        }
      } catch (error: any) {
        toast.error(
          error?.message ||
            "Profile picture was not changed. Please try again!",
        );
        setIsOpen(false);
        setFile(null);
        setImageUrl("");
      } finally {
        setIsOpen(false);
        setFile(null);
        setImageUrl("");
      }
    }
  };

  const uploadButton = (
    <Button className="flex flex-col gap-2 w-1/2 mx-auto mt-3" type="text">
      <span>
        <GoPlus />
      </span>
      <span>Select image</span>
    </Button>
  );

  return (
    <Modal
      title="Profile Picture Update"
      open={isOpen}
      footer={
        <div className="flex items-center gap-2">
          <Button disabled={isLoading} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            disabled={!imageUrl || isLoading}
            type="primary"
            onClick={handleChangeProfilePicture}
            className="w-full"
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Uploading" : "Upload"}
          </Button>
        </div>
      }
      className="flex justify-center items-center"
      maskClosable={false}
      closeIcon={false}
    >
      <div className="flex justify-center items-center">
        <div>
          <Upload
            name="avatar"
            listType={imageUrl ? "picture-circle" : "picture-card"}
            className="avatar-uploader w-full"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="image/*"
          >
            {imageUrl ? (
              <img
                className="mx-auto w-full h-full rounded-full"
                src={imageUrl}
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeProfilePicture;
