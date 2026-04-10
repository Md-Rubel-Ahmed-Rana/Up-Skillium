import { IInstructor } from "@/types/course.type";
import { Card, Typography } from "antd/lib";

const { Text } = Typography;

type Props = {
  instructor: IInstructor;
};

const InstructorCard = ({ instructor }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <img
            src={instructor?.image}
            alt={instructor?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <Text className="font-semibold">{instructor?.name}</Text>
            <Text className="text-gray-500 block">Instructor</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InstructorCard;
