import HeadlineStreaming from "./HeadlineStreaming";
import ImpressiveTextChanger from "./ImpressiveTextChanger";
import NavigatorButton from "./NavigatorButton";
import TotalCounters from "./TotalCounters";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pb-20 text-white">
      <HeadlineStreaming />
      <ImpressiveTextChanger />
      <NavigatorButton />
      <TotalCounters />
    </div>
  );
};

export default Banner;
