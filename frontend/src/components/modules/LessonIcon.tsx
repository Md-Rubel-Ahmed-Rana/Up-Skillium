import React from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaClipboardList, FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { ILessonProgress } from "@/types/studentProgress.type";

type LessonIconProps = {
  type: ILessonProgress["lesson"]["type"];
  currentLessonId: string;
  lessonId: string;
};

const LessonIcon: React.FC<LessonIconProps> = ({
  type,
  currentLessonId,
  lessonId,
}) => {
  switch (type) {
    case "video":
      return (
        <MdOutlineOndemandVideo
          className={`${
            currentLessonId === lessonId ? "text-white" : "text-blue-500"
          } `}
        />
      );
    case "instruction":
      return (
        <FaBookOpen
          className={`${
            currentLessonId === lessonId ? "text-white" : "text-green-500"
          } `}
        />
      );
    case "quiz":
      return (
        <FaQuestionCircle
          className={`${
            currentLessonId === lessonId ? "text-white" : "text-purple-500"
          } `}
        />
      );
    case "assignment":
      return (
        <FaClipboardList
          className={`${
            currentLessonId === lessonId ? "text-white" : "text-orange-500"
          } `}
        />
      );
    default:
      return null;
  }
};

export default LessonIcon;
