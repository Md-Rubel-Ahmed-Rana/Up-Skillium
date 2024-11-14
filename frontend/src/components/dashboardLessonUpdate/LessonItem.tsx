import { ILesson } from "@/types/lesson.type";
import Link from "next/link";

type Props = {
  lesson: ILesson;
};

const LessonItem = ({ lesson }: Props) => {
  const path = `/dashboard/lesson/update/${lesson?.id}?id=${lesson?.id}&&lessonType=${lesson?.type}&lessonTitle=${lesson?.title}`;
  return (
    <li className="border p-2 rounded-md font-serif bg-white cursor-pointer hover:bg-gray-200 hover:text-blue-400 hover:underline">
      <Link className="w-full block" href={path}>
        {lesson?.title}
      </Link>
    </li>
  );
};

export default LessonItem;
