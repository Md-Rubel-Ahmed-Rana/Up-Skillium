import { useDeleteLessonMutation } from "@/features/lesson";
import { Button, message, Modal, Spin } from "antd/lib";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";

type Props = {
  lessonId: string;
  lessonTitle: string;
  isButton?: boolean;
  buttonSize?: "small" | "middle" | "large";
  shouldAddIcon?: boolean;
  buttonText?: string;
  iconSize?: number;
  iconStyles?: string;
};

const DeleteLesson = ({
  lessonId,
  lessonTitle,
  isButton,
  buttonSize = "middle",
  shouldAddIcon = false,
  buttonText = "Delete",
  iconSize = 16,
  iconStyles,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLesson, { isLoading }] = useDeleteLessonMutation();

  const handleDeleteLesson = async () => {
    try {
      const result: any = await deleteLesson({ lessonId });
      if (result.data.statusCode === 200) {
        message.success(
          result?.data?.message || "Lesson has been deleted successfully."
        );
        setIsModalVisible(false);
      } else {
        message.error(
          result?.error?.data?.message ||
            result?.error?.message ||
            result?.data?.error?.message ||
            "Failed to delete lesson"
        );
      }
    } catch (error: any) {
      message.error(`Failed to delete lesson. Error: ${error?.message}`);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isButton ? (
        <Button
          type="primary"
          danger
          size={buttonSize}
          onClick={() => setIsModalVisible(true)}
          disabled={isLoading}
          loading={isLoading}
          iconPosition="end"
        >
          {shouldAddIcon ? (
            <FiTrash className={iconStyles} size={iconSize} />
          ) : (
            buttonText
          )}
        </Button>
      ) : (
        <Button
          type="primary"
          danger
          size={buttonSize}
          onClick={() => setIsModalVisible(true)}
          disabled={isLoading}
          loading={isLoading}
          iconPosition="end"
        >
          <FiTrash
            size={iconSize}
            className={iconStyles}
            onClick={() => setIsModalVisible(true)}
          />
        </Button>
      )}

      <Modal
        title={`Delete Lesson: ${lessonTitle}`}
        open={isModalVisible}
        onOk={handleDeleteLesson}
        onCancel={handleCancel}
        okText={isLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          disabled: isLoading,
        }}
        cancelButtonProps={{
          disabled: isLoading,
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin tip="Deleting lesson..." />
          </div>
        ) : (
          <p>
            Are you sure you want to delete the lesson: <b>{lessonTitle}</b>?
          </p>
        )}
      </Modal>
    </>
  );
};

export default DeleteLesson;
