/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "@/types/course.type";
import { Button, Card, Image } from "antd/lib";
import Link from "next/link";

const { Meta } = Card;
type Props = {
  course: ICourse;
};

const PopularCard = ({ course }: Props) => {
 
  return (
    <Card
      className="shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      styles={{ body: { padding: "10px" } }}
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
          href={`/courses/details/${course?.id}?courseId=${
            course?.id
          }&courseTitle=${course.title}&category=${
            course?.category
          }&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
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
      <Meta
        className="pb-3"
        title={course?.title}
      />
    </Card>
  );
};

export default PopularCard;
