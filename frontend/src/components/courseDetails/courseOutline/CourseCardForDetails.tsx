/* eslint-disable @next/next/no-img-element */
import { ICourseForOutline } from "@/types/courseOutline.type";
import { Button, Card, Typography } from "antd/lib";

const { Meta } = Card;
const { Text } = Typography;

type Props = {
  course: ICourseForOutline;
};

const CourseCardForDetails = ({ course }: Props) => {
  return (
    <Card
      cover={<img alt="course thumbnail" src={course?.image} />}
      actions={[
        <div
          key="price-section"
          className="w-11/12 flex flex-col items-center space-y-2"
        >
          <div className="flex justify-between w-11/12 items-center">
            <div className="flex items-center gap-2">
              <Text className="text-sm font-medium text-gray-500">
                Original Price
              </Text>
              <Text delete className="text-gray-500 text-lg">
                ${course?.price?.original || 99}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Text className="text-sm font-medium text-gray-500">
                Sale Price:
              </Text>
              <Text className="text-2xl font-semibold text-blue-600">
                ${course?.price?.salePrice || 44}
              </Text>
            </div>
          </div>
          <Button size="large" type="primary" className="w-11/12">
            Purchase Now
          </Button>
        </div>,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
    </Card>
  );
};

export default CourseCardForDetails;