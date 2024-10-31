import { Rate, Typography } from "antd/lib";
const { Text } = Typography;

type Props = {
  ratings: {
    averageRating: number;
    ratingCount: number;
  };
};

const RatingCard = ({ ratings }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Rate disabled defaultValue={ratings?.averageRating} />
      <Text className="text-lg font-semibold text-gray-700">
        {ratings?.averageRating} / 5.0
      </Text>
      <Text className="text-gray-500">({ratings?.ratingCount} reviews)</Text>
    </div>
  );
};

export default RatingCard;
