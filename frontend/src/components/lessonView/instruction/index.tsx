import { ILesson } from "@/types/lesson.type";

type Props = {
  lesson: ILesson;
};

const ShowInstruction = ({ lesson }: Props) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{lesson?.title}</h1>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: lesson?.content }}
      />
    </div>
  );
};

export default ShowInstruction;
