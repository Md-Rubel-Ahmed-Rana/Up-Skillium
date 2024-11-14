import { ILesson } from "@/types/lesson.type";

type Props = {
  lesson: ILesson;
};

const LessonItem = ({ lesson }: Props) => {
  return (
    <li className="border p-2 rounded-md font-serif bg-white cursor-pointer hover:bg-gray-200 hover:text-blue-400 hover:underline">
      {lesson?.title}
    </li>
  );
};

export default LessonItem;
