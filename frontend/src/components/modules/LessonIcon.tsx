import React from "react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaClipboardList, FaBookOpen, FaQuestionCircle } from "react-icons/fa";
import { ILessonProgress } from "@/types/studentProgress.type";

type LessonIconProps = {
  type: ILessonProgress["lesson"]["type"];
};

const LessonIcon: React.FC<LessonIconProps> = ({ type }) => {
  switch (type) {
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

export default LessonIcon;
