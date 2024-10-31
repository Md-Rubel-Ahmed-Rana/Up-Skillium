/* eslint-disable @next/next/no-img-element */
import { ICourseForOutline } from "@/types/courseOutline.type";
import { Button, Card } from "antd/lib";

const { Meta } = Card;

type Props = {
  course: ICourseForOutline;
};

const CourseCardForDetails = ({ course }: Props) => {
  return (
    <Card
      cover={<img alt="course thumbnail" src={course?.image} />}
      actions={[
        <Button size="large" type="primary" className="w-11/12" key={"1"}>
          Purchase Now
        </Button>,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
    </Card>
  );
};

export default CourseCardForDetails;
