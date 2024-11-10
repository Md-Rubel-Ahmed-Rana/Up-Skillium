/* eslint-disable @next/next/no-img-element */
import { IMyCourse } from "@/types/course.type";
import { Button, Card } from "antd/lib";
import Link from "next/link";

const { Meta } = Card;

type Props = {
  course: IMyCourse;
};

const MyCourseCard = ({ course }: Props) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt={course?.title} src={course?.image} />}
      actions={[
        <Link
          // href={`/modules/classes/${course?.id}?courseId=${course?.id}&courseTitle=${course?.title}`}
          href={`/classes/${course?.id}`}
          key={"1"}
        >
          <Button variant="filled" type="primary">
            Continue classes
          </Button>
        </Link>,
        <Link
          href={`/courses/details/${course?.id}?courseId=${course?.id}&courseTitle=${course?.title}`}
          key={"2"}
        >
          <Button>Course Outline</Button>,
        </Link>,
      ]}
    >
      <Meta title={course?.title} />
    </Card>
  );
};

export default MyCourseCard;
