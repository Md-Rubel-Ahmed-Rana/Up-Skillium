import { IReview } from "@/types/review.type";
import { List, Typography } from "antd/lib";

const { Text } = Typography;

type Props = {
  reviews: IReview[];
  isLoading: boolean;
};

const ReviewsList = ({ reviews, isLoading }: Props) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={reviews}
      loading={isLoading}
      renderItem={(review) => (
        <List.Item className="flex flex-col">
          <List.Item.Meta
            avatar={
              <div className="flex items-center gap-2">
                <img
                  src={review?.reviewer?.image}
                  alt={review?.reviewer?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2>{review?.reviewer?.name}</h2>
              </div>
            }
            title={<Text className="font-semibold">{review?.feedback}</Text>}
          />
        </List.Item>
      )}
    />
  );
};

export default ReviewsList;
