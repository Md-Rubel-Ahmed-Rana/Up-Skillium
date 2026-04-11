import { bannerCourses } from "@/constants/courses";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCard from "./CarouselCard";
import { makeUniqueId } from "@/utils/makeUniqueId";

const CoursesCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 1 },
      }}
    >
      {bannerCourses.map((course) => (
        <SwiperSlide className="w-full" key={makeUniqueId(course.title)}>
          <CarouselCard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CoursesCarousel;
