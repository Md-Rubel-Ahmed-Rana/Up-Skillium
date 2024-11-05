import { ILesson } from "@/types/lesson.type";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaClipboardList, FaBookOpen, FaQuestionCircle } from "react-icons/fa";

type Props = {
  lesson: ILesson;
  setCurrentLesson: (lesson: ILesson) => void;
};

const Lesson = ({ lesson, setCurrentLesson }: Props) => {
  const renderIcon = () => {
    switch (lesson?.type) {
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
    <div
      onClick={() => setCurrentLesson(lesson)}
      className="flex items-center space-x-2 border p-2 rounded-md cursor-pointer group"
    >
      {renderIcon()}
      <span className="group-hover:text-blue-400">{lesson?.title}</span>
    </div>
  );
};

export default Lesson;
