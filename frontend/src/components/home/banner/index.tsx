import HeadlineStreaming from "./HeadlineStreaming";
import NavigatorButton from "./NavigatorButton";
import WelcomeContainer from "./WelcomeContainer";

const Banner = () => {
  return (
    <div className="w-full pb-20 relative">
      <div className="relative w-full z-10 mx-auto">
        <HeadlineStreaming />
        <WelcomeContainer />
        <div className="flex justify-center">
          <NavigatorButton />
        </div>
      </div>
    </div>
  );
};

export default Banner;
