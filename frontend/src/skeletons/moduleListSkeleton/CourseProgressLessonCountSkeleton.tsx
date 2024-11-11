import { Skeleton } from "antd/lib";

const CourseProgressLessonCountSkeleton = () => {
  return (
    <div className="flex h-20 justify-between gap-3 rounded-md items-center border p-2">
      <Skeleton.Button
        active
        style={{ width: "200px", height: "20px" }}
        size="small"
      />
      <Skeleton.Button
        active
        style={{ width: "200px", height: "20px" }}
        size="small"
      />
    </div>
  );
};

export default CourseProgressLessonCountSkeleton;
