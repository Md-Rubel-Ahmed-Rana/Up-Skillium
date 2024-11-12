/* eslint-disable @next/next/no-img-element */
import { fallbackImageUrl } from "@/constants/fallback";
import { ICourse } from "@/types/course.type";
import { Button, Card, Image } from "antd/lib";
import Link from "next/link";

const { Meta } = Card;

type Props = {
  course: ICourse;
};

const ManageCourseCard = ({ course }: Props) => {
  return (
    <Card
      className="border shadow-lg"
      styles={{ body: { padding: "10px" } }}
      cover={
        course?.image ? (
          <img alt="course thumbnail" src={course?.image} />
        ) : (
          <Image
            src="error"
            height={200}
            fallback={fallbackImageUrl}
            preview={false}
            alt="Placeholder Image"
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
            Classes
          </Button>
        </Link>,
        <Link
          href={`/checkout/${course?.id}?courseId=${course?.id}&courseName=${
            course.title
          }&category=${course?.category}&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
          key={"1"}
        >
          <Button
            className="w-[90%] bg-green-500 text-white"
            type="primary"
            key={"2"}
          >
            Outlines
          </Button>
        </Link>,
        <Link
          href={`/checkout/${course?.id}?courseId=${course?.id}&courseName=${
            course.title
          }&category=${course?.category}&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
          key={"1"}
        >
          <Button type="primary" className="w-[90%]" key={"2"}>
            Details
          </Button>
        </Link>,
      ]}
    >
      <Meta
        className="pb-3"
        title={course?.title}
        description={course?.description}
      />
    </Card>
  );
};

export default ManageCourseCard;
