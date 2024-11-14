/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILesson } from "@/types/lesson.type";
import { FiTrash } from "react-icons/fi";
import { message, Modal, Spin } from "antd";
import { useState } from "react";
import { useDeleteLessonMutation } from "@/features/lesson";

type Props = {
  lesson: ILesson;
};

const LessonDeleteButton = ({ lesson }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLesson, { isLoading }] = useDeleteLessonMutation();

  const handleDeleteLesson = async () => {
    try {
      const result: any = await deleteLesson({ lessonId: lesson?.id });
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
      <button
        className={`p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition ${
          isLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
        onClick={() => setIsModalVisible(true)}
        disabled={isLoading}
      >
        {isLoading ? <Spin size="small" /> : <FiTrash size={16} />}
      </button>

      <Modal
        title="Delete Lesson"
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
            Are you sure you want to delete the lesson: <b>{lesson?.title}</b>?
          </p>
        )}
      </Modal>
    </>
  );
};

export default LessonDeleteButton;
