import { Skeleton } from "antd/lib";

const LessonListSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 p-2">
      {Array.from({ length: 5 }).map((item, index) => (
        <Skeleton.Button
          key={index}
          active
          size="small"
          style={{ width: "390px" }}
          className="border p-2 rounded-md"
        />
      ))}
    </div>
  );
};

export default LessonListSkeleton;
