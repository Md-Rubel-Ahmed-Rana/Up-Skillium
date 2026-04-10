import { Button } from "antd/lib";
import { useState } from "react";
import ViewLessonsModal from "./ViewLessonsModal";

type Props = {
  lessons: number;
  moduleId: string;
  moduleName: string;
};

const ViewLessonButton = ({ moduleName, moduleId, lessons }: Props) => {
  const [isShowLessons, setIsShowLessons] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsShowLessons(true)}
      >{`View : ${lessons}`}</Button>
      <ViewLessonsModal
        moduleId={moduleId}
        moduleName={moduleName}
        open={isShowLessons}
        setOpen={setIsShowLessons}
      />
    </div>
  );
};

export default ViewLessonButton;
