import { Skeleton } from "antd/lib";

const LessonSearchSkeleton = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <Skeleton.Input
        active
        size="large"
        className="w-[90%]"
        style={{ width: "420px", height: "40px", borderRadius: "8px" }}
      />
    </div>
  );
};

export default LessonSearchSkeleton;
