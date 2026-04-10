import { Button } from "antd/lib";
import { useState } from "react";
import UpdateCourseImage from "./UpdateCourseImage";

type Props = {
  courseId: string;
  image: string;
};
const CourseImage = ({ courseId, image }: Props) => {
  const [isImageChange, setIsImageChange] = useState(false);
  return (
    <>
      <div className="w-full  rounded-lg p-2 ring-1">
        <img
          src={image}
          alt="course thumbnail"
          className="w-full h-[87%] rounded-md"
        />
        <Button
          onClick={() => setIsImageChange(true)}
          size="large"
          type="primary"
          className="w-full mt-2"
        >
          Change Image
        </Button>
      </div>
      {isImageChange && (
        <UpdateCourseImage
          courseId={courseId}
          open={isImageChange}
          setOpen={setIsImageChange}
        />
      )}
    </>
  );
};

export default CourseImage;
