import { Button } from "antd/lib";
import ReactPlayer from "react-player";

type Props = {
  courseId: string;
  videoUrl: string;
};

const IntroVideoPlayer = ({ courseId, videoUrl }: Props) => {
  console.log(courseId);
  return (
    <div className="w-full rounded-lg overflow-hidden p-2 ring-1">
      <div className="relative pb-[53%]">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          className="absolute object-cover top-0 left-0 rounded-lg overflow-hidden shadow-lg"
        />
      </div>
      <Button size="large" type="primary" className="w-full mt-2">
        Change Video
      </Button>
    </div>
  );
};

export default IntroVideoPlayer;
