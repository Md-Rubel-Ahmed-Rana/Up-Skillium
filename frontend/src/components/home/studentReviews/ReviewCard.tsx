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
      className="w-full"
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space size="middle" align="center">
          {review.reviewer.image ? (
            <Avatar
              size={48}
              src={review.reviewer.image}
              alt={review.reviewer.name}
            />
          ) : (
            <Avatar className="h-12 w-12">
              {review.reviewer.name
                .split(" ")
                .map((word) => word.slice(0, 1).toUpperCase())}
            </Avatar>
          )}

          <div>
            <Text strong>{review.reviewer.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {dayjs(review.createdAt).format("MMM D, YYYY")}
            </Text>
          </div>
        </Space>

        <Rate
          disabled
          allowHalf
          defaultValue={review.rating}
          style={{ fontSize: 16, color: "#fadb14" }}
        />

        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
          {review.feedback}
        </Paragraph>

        <Space size="small" align="center">
          <Avatar
            size={40}
            shape="square"
            src={review.reviewTo.image}
            alt={isInstructor ? reviewTo?.name : reviewTo?.title}
          />
          <div className="flex flex-col gap-1">
            <Text strong>
              {isInstructor ? reviewTo?.name : reviewTo?.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {isInstructor ? "Instructor" : "Course"}
            </Text>
          </div>
        </Space>
      </Space>
    </Card>
  );
};

export default ReviewCard;
