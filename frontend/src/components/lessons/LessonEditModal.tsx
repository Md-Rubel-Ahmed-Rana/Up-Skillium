import { useUpdateLessonMutation } from "@/features/lesson";
import { IGetLesson } from "@/types/lesson.type";
import { Button, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  lesson: IGetLesson;
};

const LessonEditModal = ({ lesson }: Props) => {
  const [open, setOpen] = useState(false);
  const [editLesson, { isLoading }] = useUpdateLessonMutation();
  const [editedTitle, setEditedTitle] = useState(lesson?.title);

  const handleEditLesson = async () => {
    try {
      const result: any = await editLesson({
        lessonId: lesson?.id,
        data: { ...lesson, title: editedTitle, module: lesson?.module?.id },
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Lesson updated successfully!");
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to updated lesson."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to updated lesson. Error: ${error?.message}`);
    }
  };

  const isTittleEdited =
    lesson?.title?.toLowerCase()?.trim() === editedTitle?.toLowerCase()?.trim();

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        open={open}
        onOk={handleEditLesson}
        onCancel={() => setOpen(false)}
        title="Edit lesson"
        okText={isLoading ? "Saving..." : "Save changes"}
        okButtonProps={{
          disabled: isLoading || isTittleEdited,
          loading: isLoading,
          iconPosition: "end",
        }}
      >
        <Input
          name="title"
          placeholder="Enter title"
          onChange={(e) => setEditedTitle(e.target.value)}
          value={editedTitle || lesson?.title}
        />
      </Modal>
    </>
  );
};

export default LessonEditModal;
