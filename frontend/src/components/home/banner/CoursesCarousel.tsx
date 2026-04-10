import { bannerCourses } from "@/constants/courses";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCard from "./CarouselCard";

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
      {bannerCourses.map((course, index) => (
        <SwiperSlide className="w-full" key={index}>
          <CarouselCard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CoursesCarousel;
