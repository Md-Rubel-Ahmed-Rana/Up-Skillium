import { useGetSingleLessonQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  lessonId: string;
};

const ShowAssignmentRequirements = ({ lessonId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetSingleLessonQuery({
    lessonId,
  });

  const lesson = data?.data as ILesson;

  return (
    <>
      <Button type="primary" size="middle" onClick={() => setIsModalOpen(true)}>
        Requirements
      </Button>
      <Modal
        loading={isLoading}
        title="Assignment Requirements"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div dangerouslySetInnerHTML={{ __html: lesson?.content }} />
      </Modal>
    </>
  );
};

export default ShowAssignmentRequirements;
