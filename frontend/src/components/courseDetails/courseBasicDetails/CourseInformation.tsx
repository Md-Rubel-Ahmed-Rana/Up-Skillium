import { ICourse } from "@/types/course.type";
import { Card, Divider, Tag, Typography } from "antd/lib";

const { Text } = Typography;

type Props = {
  course: ICourse;
};

const CourseInformation = ({ course }: Props) => {
  return (
    <Card bordered={false} className="rounded-lg space-y-4">
      <Divider>Course Information</Divider>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Text className="font-semibold text-lg text-gray-700">Level:</Text>
          <Tag color="blue">{course?.level}</Tag>
        </div>

        <div className="flex  items-center gap-2">
          <Text className="font-semibold text-lg text-gray-700">Duration:</Text>
          <Text className="text-gray-600">{course?.duration}</Text>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center  gap-2">
          <Text className="font-semibold text-lg text-gray-700">Tags:</Text>
          <div className="flex flex-wrap gap-2">
            {course?.tags?.map((tag) => (
              <Tag color="purple" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
          <Text className="font-semibold text-lg text-gray-700">
            Technologies:
          </Text>
          <div className="flex flex-wrap gap-2">
            {course?.technologies?.map((tech) => (
              <Tag color="geekblue" key={tech}>
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseInformation;
