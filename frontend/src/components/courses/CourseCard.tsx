import { fallbackImageUrl } from "@/constants/fallback";
import { ICourse } from "@/types/course.type";
import { Avatar, Button, Card, Image, Rate, Typography } from "antd/lib";
import Link from "next/link";
import CheckoutRedirectButton from "./CheckoutRedirectButton";

const { Meta } = Card;
const { Text } = Typography;

type Props = {
  course: ICourse;
};

const CourseCard = ({ course }: Props) => {
  return (
    <Card
      className="shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      styles={{ body: { padding: "10px" } }}
      cover={
        course?.image ? (
          <img
            alt="course thumbnail"
            src={course?.image}
            className="h-[200px]"
          />
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
            See Details
          </Button>
        </Link>,
        <CheckoutRedirectButton
          course={course}
          buttonText="Buy Now"
          key={"1"}
          buttonSize="middle"
          styles="w-[90%]"
        />,
      ]}
    >
      <Meta
        className="pb-3"
        title={course?.title}
        description={course?.description}
      />
      <div className="pt-4 border-t">
        <Meta
          className="border rounded-md p-2 text-xs flex items-center"
          avatar={
            course?.instructor?.image ? (
              <Avatar
                size={40}
                className="ring-1"
                src={course?.instructor?.image}
              />
            ) : (
              <Avatar size={40} className="ring-1 ">
                {course?.instructor?.name?.slice(0, 1)?.toUpperCase()}
              </Avatar>
            )
          }
          title={course?.instructor?.name || "Unknown"}
          description="Instructor"
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col items-center space-y-2">
          <Rate
            allowHalf={true}
            count={5}
            disabled
            value={course?.ratings?.averageRating || 0}
            defaultValue={course?.ratings?.averageRating || 0}
          />
          <span className="text-sm text-gray-500">
            ({course?.ratings?.totalReviews || 0} Ratings)
          </span>
        </div>
        <div className="flex flex-col font-semibold">
          <div>
            <Text>Original: </Text>
            <Text delete type="warning">
              ${course?.price?.original}
            </Text>
          </div>
          <div>
            <Text>Discount: </Text>
            <Text type="danger"> -{course?.price?.discount}%</Text>
          </div>
          <div>
            <Text>Sale Price: </Text>
            <Text type="success"> ${course?.price?.salePrice}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
