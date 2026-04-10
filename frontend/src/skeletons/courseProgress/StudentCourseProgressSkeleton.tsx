import { Skeleton } from "antd/lib";

const StudentCourseProgressSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 gap-3 p-2 lg:p-0">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          className="border shadow-md px-3 py-5 lg:py-10 rounded-md"
          key={index}
          active
          paragraph={{ rows: 2 }}
        />
      ))}
    </div>
  );
};

export default StudentCourseProgressSkeleton;
