import { ILesson } from "@/types/lesson.type";

type Props = {
  lesson: ILesson;
};

const LessonAssignment = ({ lesson }: Props) => {
  return (
    <div>
      <h6 className="font-semibold">Content: </h6>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: lesson?.content }}
      />
    </div>
  );
};

export default LessonAssignment;
