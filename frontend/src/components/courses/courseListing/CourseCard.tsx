import { ICourse } from "@/types/course.type";
import { Avatar, Card, Rate, Typography } from "antd/lib";
import Image from "next/image";
import CheckoutRedirectButton from "./CheckoutRedirectButton";
import CourseDetailsRedirectButton from "./CourseDetailsRedirectButton";

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
        <Image
          alt={course?.title}
          src={course?.image}
          height={160}
          width={300}
          className="object-cover rounded-lg"
        />
      }
      actions={[
        <CourseDetailsRedirectButton
          buttonSize="middle"
          buttonStyles="w-[90%] bg-yellow-500 text-white"
          buttonType="dashed"
          course={course}
          isButton={true}
          text="See Details"
          key={"1"}
        />,
        <CheckoutRedirectButton
          course={course}
          buttonText="Buy Now"
          key={"2"}
          buttonSize="middle"
          styles="w-[90%]"
        />,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
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
        <div>
          {course?.price?.discount > 0 ? (
            <div className="space-x-2 text-sm font-semibold">
              <span className="line-through text-orange-400">
                ${course?.price?.original}
              </span>
              <span className="text-red-500">-{course?.price?.discount}%</span>
              <span className="text-green-600">
                ${course?.price?.salePrice}
              </span>
            </div>
          ) : (
            <span className="text-green-600 font-semibold text-sm">
              ${course?.price?.salePrice}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
