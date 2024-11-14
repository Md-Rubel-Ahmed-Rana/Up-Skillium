import { IReview } from "@/types/course.type";
import { List, Typography } from "antd/lib";

const { Text } = Typography;

type Props = {
  reviews: IReview[];
};

const ReviewsList = ({ reviews }: Props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <img
                src={review?.reviewer?.image}
                alt={review?.reviewer?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            }
            title={<Text className="font-semibold">{review?.review}</Text>}
          />
        </List.Item>
      )}
    />
  );
};

export default ReviewsList;
