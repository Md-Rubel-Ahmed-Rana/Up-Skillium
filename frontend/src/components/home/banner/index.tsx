import CoursesCarousel from "./CoursesCarousel";
import HeadlineStreaming from "./HeadlineStreaming";

const Banner = () => {
  return (
    <div className="w-full pb-20 relative">
      <div className="relative w-full z-10 mx-auto">
        <HeadlineStreaming />
        <CoursesCarousel />
      </div>
    </div>
  );
};

export default Banner;
