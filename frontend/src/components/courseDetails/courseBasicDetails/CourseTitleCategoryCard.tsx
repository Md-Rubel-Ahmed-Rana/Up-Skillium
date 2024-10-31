import { Card, Typography } from "antd/lib";
const { Title, Text } = Typography;

type Props = {
  title: string;
  category: string;
};

const CourseTitleCategoryCard = ({ title, category }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg">
      <Title level={3} className="text-blue-600">
        {title}
      </Title>
      <Text className="text-gray-500">{category}</Text>
    </Card>
  );
};

export default CourseTitleCategoryCard;
