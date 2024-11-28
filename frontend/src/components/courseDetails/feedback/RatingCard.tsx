import { Rate, Typography } from "antd/lib";
const { Text } = Typography;

type Props = {
  ratings: {
    averageRating: number;
    totalReviews: number;
  };
};

const RatingCard = ({ ratings }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Rate
        allowHalf={true}
        count={5}
        disabled
        value={ratings?.averageRating || 0}
        defaultValue={ratings?.averageRating || 0}
      />
      <Text className="lg:text-lg font-semibold text-gray-700">
        {ratings?.averageRating} / 5.0
      </Text>
      <Text className="text-gray-500">({ratings?.totalReviews} reviews)</Text>
    </div>
  );
};

export default RatingCard;
