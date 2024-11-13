import { ILesson } from "@/types/lesson.type";
import LessonVideoModal from "./LessonVideoModal";
import { useState } from "react";

type Props = {
  lesson: ILesson;
};

const LessonVideo = ({ lesson }: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
      <p>Video length: {lesson?.videoLength} mins</p>
      <p>
        <button
          onClick={() => setShowVideo(true)}
          className="px-2 py-1 rounded-md ring-1 font-semibold hover:bg-blue-300"
        >
          Watch video
        </button>
      </p>
      <LessonVideoModal
        open={showVideo}
        setOpen={setShowVideo}
        videoUrl={lesson?.videoUrl}
        title={lesson?.title}
      />
    </div>
  );
};

export default LessonVideo;
