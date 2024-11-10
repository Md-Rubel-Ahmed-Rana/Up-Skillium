import { Skeleton } from "antd/lib";
import { useMediaQuery } from "react-responsive";

const SingleLessonSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "768px" });
  return (
    <div>
      <Skeleton.Node
        active
        style={{
          width: isLargeDevice ? "700px" : "300px",
          height: "300px",
          borderRadius: "8px 8px 0px 0px",
        }}
        className="w-full"
      />
    </div>
  );
};

export default SingleLessonSkeleton;
