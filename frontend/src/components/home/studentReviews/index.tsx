import { IReview } from "@/types/review.type";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";
import ReviewHeader from "./ReviewHeader";

type Props = {
  reviews: IReview[];
};

const StudentReviews = ({ reviews = [] }: Props) => {
  return (
    <div className="flex flex-col gap-6 py-20 px-2">
      <ReviewHeader />
      <div className="max-w-[1250px] w-full mx-auto lg:px-4 py-12 overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide className="w-full" key={review?.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentReviews;
