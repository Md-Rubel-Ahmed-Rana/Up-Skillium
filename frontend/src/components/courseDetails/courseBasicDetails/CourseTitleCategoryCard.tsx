import { Button, Card, Typography } from "antd/lib";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
const { Title, Text } = Typography;

type Props = {
  title: string;
  category: string;
  totalStudents: number;
};

const CourseTitleCategoryCard = ({ title, category, totalStudents }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg p-4">
      <Title level={3} className="text-blue-600">
        {title}
      </Title>
      <Text className="text-gray-500 block mb-2">{category}</Text>
      <Button
        icon={<AiOutlineUsergroupAdd className="text-green-500 text-lg" />}
        className="text-green-500 font-medium flex items-center gap-2"
      >
        {totalStudents?.toLocaleString() || 0} students enrolled
      </Button>
    </Card>
  );
};

export default CourseTitleCategoryCard;
