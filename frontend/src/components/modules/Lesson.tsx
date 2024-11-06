import { ILesson } from "@/types/lesson.type";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaClipboardList, FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { ILessonProgress } from "@/types/studentProgress.type";
import { MdLockOutline } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";

type Props = {
  lesson: ILessonProgress;
  setCurrentLesson: (lesson: ILesson) => void;
};

const Lesson = ({ lesson }: Props) => {
  const renderIcon = () => {
    switch (lesson?.lesson?.type) {
      case "video":
        return <MdOutlineOndemandVideo className="text-blue-500" />;
      case "instruction":
        return <FaBookOpen className="text-green-500" />;
      case "quiz":
        return <FaQuestionCircle className="text-purple-500" />;
      case "assignment":
        return <FaClipboardList className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between  border p-2 rounded-md cursor-pointer group">
      <div className="flex items-center space-x-2">
        {renderIcon()}
        <span className="group-hover:text-blue-400">
          {lesson?.lesson?.title}
        </span>
      </div>
      {lesson?.isLessonCompleted ? (
        <IoCheckmarkCircle className="text-2xl text-green-500" />
      ) : (
        <MdLockOutline className="text-2xl text-red-400" />
      )}
    </div>
  );
};

export default Lesson;
