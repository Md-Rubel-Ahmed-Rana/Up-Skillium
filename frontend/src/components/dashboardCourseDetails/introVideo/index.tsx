import { Button } from "antd/lib";
import { useState } from "react";
import ReactPlayer from "react-player";
import IntroVideoUpdate from "./IntroVideoUpdate";

type Props = {
  courseId: string;
  videoUrl: string;
};

const IntroVideoPlayer = ({ courseId, videoUrl }: Props) => {
  const [isUpdateVideo, setIsUpdateVideo] = useState(false);
  return (
    <div className="w-full rounded-lg overflow-hidden p-2 ring-1">
      <div className="relative pb-[58%]">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          className="absolute object-cover top-0 left-0 rounded-lg overflow-hidden shadow-lg"
        />
      </div>
      <Button
        onClick={() => setIsUpdateVideo(true)}
        size="large"
        type="primary"
        className="w-full mt-2"
      >
        Change Video
      </Button>
      {isUpdateVideo && (
        <IntroVideoUpdate
          courseId={courseId}
          open={isUpdateVideo}
          setOpen={setIsUpdateVideo}
        />
      )}
    </div>
  );
};

export default IntroVideoPlayer;
