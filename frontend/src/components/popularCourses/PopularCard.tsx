/* eslint-disable @next/next/no-img-element */

import { ICourse } from "@/types/course.type";
import { Button, Card, Image } from "antd/lib";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const { Meta } = Card;
type Props = {
  course: ICourse;
};

const PopularCard = ({ course }: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 10,
      x: 10,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  return (
    <Card
      ref={cardRef}
      className="w-full lg:w-[90%] shadow-md transition-transform duration-300 p-3 mb-4 md:mb-6 lg:mb-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cover={
        course?.image ? (
          <img
            alt="course thumbnail"
            src={course?.image}
            className="w-full h-48 object-cover md:h-52 lg:h-56"
          />
        ) : (
          <Image
            src="error"
            height={180}
            fallback="https://firebasestorage.googleapis.com/v0/b/up-skillium.appspot.com/o/up-skillium%2Fassets%2Ffallback-image.png?alt=media&token=c3cb9e52-a43e-4666-a534-216a99c60a88"
            alt="fallback image"
            preview={false}
            className="w-full h-48 object-cover md:h-52 lg:h-56"
          />
        )
      }
      actions={[
        <Link
          href={`/courses/details/${course?.id}?courseId=${
            course?.id
          }&courseTitle=${course.title}&category=${
            course?.category
          }&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
          key={"1"}
        >
          <Button
            type="dashed"
            className="w-full text-xs md:text-sm lg:text-base bg-yellow-500 text-white"
          >
            See Details
          </Button>
        </Link>,
        <Button
          type="primary"
          className="w-full text-xs md:text-sm lg:text-base"
          key={"2"}
        >
          Buy Now
        </Button>,
      ]}
    >
      <Meta className="pb-2 md:pb-3 lg:pb-4" title={course?.title} />
    </Card>
  );
};

export default PopularCard;
