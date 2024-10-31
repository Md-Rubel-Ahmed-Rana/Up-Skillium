/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "@/types/course.type";
import { Avatar, Button, Card, Rate, Typography, Image } from "antd/lib";
import NextImage from "next/image";

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
          <NextImage alt="course thumbnail" src={course?.image} />
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
        <Button
          type="dashed"
          className="w-[90%] bg-yellow-500 text-white"
          key={"1"}
        >
          See Details
        </Button>,
        <Button type="primary" className="w-[90%]" key={"2"}>
          Buy Now
        </Button>,
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
            <Avatar
              size={40}
              className="ring-1"
              src={course?.instructor?.image}
            />
          }
          title={course?.instructor?.name || "Unknown"}
          description="Instructor"
        />
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col items-center space-y-2">
          <Rate allowHalf defaultValue={2.5} />
          <span className="text-sm text-gray-500">
            ({course?.ratings?.ratingCount || 0} Ratings)
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
