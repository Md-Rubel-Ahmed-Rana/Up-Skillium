/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button, Modal, Upload, UploadProps } from "antd/lib";
import { GoPlus } from "react-icons/go";
import ProfilePictureChangeButton from "./ProfilePictureChangeButton";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const UpdateProfilePicture: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const uploadButton = (
    <Button className="flex flex-col gap-2 w-1/2 mx-auto mt-3" type="text">
      <span>
        <GoPlus />
      </span>
      <span>Upload</span>
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
          <ProfilePictureChangeButton
            imageUrl={imageUrl}
            file={file}
            setIsOpen={setIsOpen}
            setIsLoading={setIsLoading}
            setFile={setFile}
            setImageUrl={setImageUrl}
          />
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

export default UpdateProfilePicture;
