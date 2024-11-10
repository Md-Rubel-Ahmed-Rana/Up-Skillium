/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
      y: 20, 
      x: 40,
      duration: 2, 
      ease: "power1.inOut",
      repeat: -1, 
      yoyo: true, 
    });
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.2, 
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
      className="shadow-lg transform transition-transform duration-300 p-4 mb-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cover={
        course?.image ? (
          <img alt="course thumbnail" src={course?.image} />
        ) : (
          <Image
            src="error"
            height={200}
            fallback="https://firebasestorage.googleapis.com/v0/b/up-skillium.appspot.com/o/up-skillium%2Fassets%2Ffallback-image.png?alt=media&token=c3cb9e52-a43e-4666-a534-216a99c60a88"
            alt="fallback image"
            preview={false}
          />
        )
      }
      actions={[
        <Link
          href={`/courses/details/${course?.id}?courseId=${course?.id}&courseTitle=${course.title}&category=${course?.category}&description=${course?.description}&tags=${course?.tags?.toString()}`}
          key={"1"}
        >
          <Button type="dashed" className="w-[90%] bg-yellow-500 text-white">
            See Details
          </Button>
        </Link>,
        <Button type="primary" className="w-[90%]" key={"2"}>
          Buy Now
        </Button>,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
    </Card>
  );
};

export default PopularCard;
