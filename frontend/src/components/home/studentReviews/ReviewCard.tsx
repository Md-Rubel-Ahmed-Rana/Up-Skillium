import { IReview } from "@/types/review.type";
import { Avatar, Card, Rate, Space, Typography } from "antd/lib";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

type Props = {
  review: IReview;
};

const ReviewCard = ({ review }: Props) => {
  const isInstructor = review.reviewToModel === "Instructor";

  const reviewTo = review?.reviewTo as any;

  return (
    <Card
      hoverable
      style={{ borderRadius: 16, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
      styles={{ body: { minHeight: 280 } }}
      className="bg-gradient-to-r border-gray-400 from-blue-600 via-purple-600 to-pink-600 text-white"
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Reviewer Info */}
        <Space size="middle" align="center">
          <Avatar
            size={48}
            src={review.reviewer.image}
            alt={review.reviewer.name}
          />
          <div>
            <Text className="text-white" strong>
              {review.reviewer.name}
            </Text>
            <br />
            <Text
              className="text-white"
              type="secondary"
              style={{ fontSize: 12, color: "whitesmoke" }}
            >
              {dayjs(review.createdAt).format("MMM D, YYYY")}
            </Text>
          </div>
        </Space>

        {/* Review Rating */}
        <Rate
          disabled
          allowHalf
          defaultValue={review.rating}
          style={{ fontSize: 16, color: "#fadb14" }}
        />

        {/* Feedback Text */}
        <Paragraph
          className="text-white"
          ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
        >
          {review.feedback}
        </Paragraph>

        {/* Review To (Course or Instructor) */}
        <Space size="small" align="center">
          <Avatar
            size={40}
            shape="square"
            src={review.reviewTo.image}
            alt={isInstructor ? reviewTo?.name : reviewTo?.title}
          />
          <div className="flex flex-col gap-1">
            <Text className="text-white" strong>
              {isInstructor ? reviewTo?.name : reviewTo?.title}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: 12, color: "whitesmoke" }}
            >
              {isInstructor ? "Instructor" : "Course"}
            </Text>
          </div>
        </Space>
      </Space>
    </Card>
  );
};

export default ReviewCard;
