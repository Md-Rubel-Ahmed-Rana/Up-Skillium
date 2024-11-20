import { useGetLessonsByModuleIdQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Modal, Tag } from "antd/lib";

type Props = {
  moduleId: string;
  moduleName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ViewLessonsModal = ({ open, setOpen, moduleName, moduleId }: Props) => {
  const { data, isLoading } = useGetLessonsByModuleIdQuery({ moduleId });
  const lessons = data?.data as ILesson[];
  return (
    <Modal
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      title={`Lessons for: ${moduleName}`}
      loading={isLoading}
    >
      <div className="flex flex-col gap-3">
        {lessons.map((lesson) => (
          <div
            className="flex justify-between gap-3 border p-2 rounded-md bg-gray-50"
            key={lesson?.id}
          >
            <div className="flex items-center ga-2">
              <Tag color="geekblue">S. {lesson?.serial}</Tag>
              <h3>{lesson?.title}</h3>
            </div>
            <Tag color="geekblue">{lesson?.type}</Tag>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ViewLessonsModal;
