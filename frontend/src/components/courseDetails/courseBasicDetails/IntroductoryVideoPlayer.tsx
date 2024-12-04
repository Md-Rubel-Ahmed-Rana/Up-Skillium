import { Card } from "antd/lib";
import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
};

const IntroductoryVideoPlayer = ({ videoUrl }: Props) => {
  return (
    <Card
      className="w-full rounded-lg overflow-hidden ring-2 bg-blue-100"
      styles={{ body: { padding: "0px" } }}
      bordered={false}
    >
      <div className="relative pb-[56.25%]">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          className="absolute object-cover top-0 left-0 rounded-lg overflow-hidden shadow-lg"
        />
      </div>
    </Card>
  );
};

export default IntroductoryVideoPlayer;
