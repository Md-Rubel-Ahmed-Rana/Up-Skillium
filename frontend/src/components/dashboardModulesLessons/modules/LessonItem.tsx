import { ILesson } from "@/types/lesson.type";
import { FiEdit, FiTrash } from "react-icons/fi";
import LessonVideo from "./video";
import LessonIntro from "./introduction";
import LessonAssignment from "./assignment";
import LessonQuiz from "./quiz";
import Link from "next/link";

type Props = {
  lesson: ILesson;
};

const LessonItem = ({ lesson }: Props) => {
  const path = `/dashboard/lesson/update/${lesson?.id}?id=${lesson?.id}&&lessonType=${lesson?.type}&lessonTitle=${lesson?.title}`;
  return (
    <div className="border rounded-md shadow-sm p-4 hover:bg-gray-50 transition duration-200">
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-semibold lg:text-lg">
          {lesson?.serial}. {lesson?.title}
        </h5>
        <div className="flex gap-2">
          <Link
            href={path}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <FiEdit size={16} />
          </Link>
          <button
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={() => alert(`Delete lesson: ${lesson?.title}`)}
          >
            <FiTrash size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <p>
          <span className="font-medium">Type:</span> {lesson?.type}
        </p>
        <p>
          <span className="font-medium">Serial:</span> {lesson?.serial}
        </p>
        <p>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(lesson?.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Updated At:</span>{" "}
          {new Date(lesson?.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="my-2">
        {lesson?.type === "video" && <LessonVideo lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "instruction" && <LessonIntro lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "assignment" && <LessonAssignment lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "quiz" && <LessonQuiz lesson={lesson} />}
      </div>
    </div>
  );
};

export default LessonItem;
