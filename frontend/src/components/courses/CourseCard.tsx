/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "@/types/course.type";
import { Avatar, Button, Card, Rate, Typography } from "antd/lib";

const { Meta } = Card;
const { Text } = Typography;

type Props = {
  course: ICourse;
};

const CourseCard = ({ course }: Props) => {
  return (
    <Card
      cover={<img alt="course thumbnail" src={course?.image} />}
      actions={[
        <Button type="default" className="w-[95%]" key={"1"}>
          See Outline
        </Button>,
        <Button type="primary" className="w-[95%]" key={"2"}>
          Buy Now
        </Button>,
      ]}
    >
      <Meta
        className="pb-3"
        title={course?.title}
        description={course?.description}
      />
      <div className="pt-4 border-t-2">
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
          description={course?.instructor?.bio || "Instructor"}
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
