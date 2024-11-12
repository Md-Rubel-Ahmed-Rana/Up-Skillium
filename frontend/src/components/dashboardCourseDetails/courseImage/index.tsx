/* eslint-disable @next/next/no-img-element */
import { Button } from "antd/lib";

type Props = {
  courseId: string;
  image: string;
};
const CourseImage = ({ courseId, image }: Props) => {
  console.log(courseId);
  return (
    <div className="w-full  rounded-lg p-2 ring-1">
      <img src={image} alt="course thumbnail" className="w-full rounded-md" />
      <Button size="large" type="primary" className="w-full mt-2">
        Change Image
      </Button>
    </div>
  );
};

export default CourseImage;
