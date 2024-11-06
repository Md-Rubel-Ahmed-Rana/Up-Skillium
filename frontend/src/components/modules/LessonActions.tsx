import { ILesson } from "@/types/lesson.type";
import { Button } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  lesson: ILesson;
};

const LessonActions = ({ lesson }: Props) => {
  const handleActions = () => {
    toast.success("Feature is coming very soon.");
    console.log(lesson);
  };

  return (
    <div className="flex items-center lg:justify-end justify-between gap-2 mt-3">
      <Button onClick={handleActions}>Previous</Button>
      <Button onClick={handleActions} className="px-8" type="primary">
        Next
      </Button>
    </div>
  );
};

export default LessonActions;
