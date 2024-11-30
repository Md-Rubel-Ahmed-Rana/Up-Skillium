import { hostedImages } from "@/constants/images";
import HeadlineStreaming from "./HeadlineStreaming";
import ImpressiveTextChanger from "./ImpressiveTextChanger";
import NavigatorButton from "./NavigatorButton";
import TotalCounters from "./TotalCounters";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pb-20 text-white relative">
      <div
        className="absolute inset-y-0 left-0 w-1/2 z-0 animate__animated animate__fadeInDown"
        style={{
          backgroundImage: `url(${hostedImages?.banner?.bgImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      ></div>

      <div
        className="absolute inset-y-0 right-0 w-1/2 z-0 animate__animated animate__fadeInUp"
        style={{
          backgroundImage: `url(${hostedImages?.banner?.bgImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      ></div>

      <div className="relative w-full z-10 mx-auto">
        <HeadlineStreaming />
        <ImpressiveTextChanger />
        <div className="flex justify-center">
          <NavigatorButton />
        </div>
        <TotalCounters />
      </div>
    </div>
  );
};

export default Banner;
