import { ICourse } from "@/types/course.type";
import { Card, Rate, Space, Tag } from "antd/lib";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import CheckoutRedirectButton from "../courseListing/CheckoutRedirectButton";
import CourseDetailsRedirectButton from "../courseListing/CourseDetailsRedirectButton";

const { Meta } = Card;

type Props = {
  course: ICourse;
};

const TopSellingCard = ({ course }: Props) => {
  return (
    <Card
      hoverable
      className="rounded-lg overflow-hidden relative group"
      cover={
        <div className="relative overflow-hidden">
          <Image
            alt={course?.title}
            src={course?.image}
            height={160}
            width={300}
            className="w-full h-40 object-cover transition-all duration-300 group-hover:scale-105 rounded-t-lg"
          />

          <Tag
            color="gold"
            className="absolute top-4 left-4 font-semibold py-1 px-3 shadow-md"
          >
            Top Pick
          </Tag>
        </div>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Meta
          title={
            <h3 className="text-lg font-bold text-gray-800">{course?.title}</h3>
          }
          description={
            <div className="flex flex-col">
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <span className="flex items-center gap-1">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={course?.ratings?.averageRating || 0}
                    style={{ fontSize: "16px" }}
                  />
                  <span className="ml-1">
                    ({course?.ratings?.totalReviews || 0} Reviews)
                  </span>
                </span>
              </div>
              <span className="text-gray-600 text-sm">
                {course?.students?.length || 0} Students Enrolled
              </span>
            </div>
          }
        />
        <Space direction="horizontal" size="middle" className="w-full">
          <CourseDetailsRedirectButton
            buttonSize="middle"
            buttonStyles="w-full bg-yellow-500 text-white"
            buttonType="default"
            course={course}
            isButton={true}
            text="See Details"
            key="1"
          />
          <CheckoutRedirectButton
            course={course}
            buttonText="Buy Now"
            key="2"
            buttonSize="middle"
            styles="w-full"
          />
        </Space>
      </Space>
      <FaStar className="text-4xl text-yellow-500 absolute top-4 right-4" />
    </Card>
  );
};

export default TopSellingCard;
