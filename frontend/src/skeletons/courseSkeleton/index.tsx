import { Divider, Skeleton } from "antd/lib";
import { useMediaQuery } from "react-responsive";

const CourseSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "768px" });
  return (
    <div
      style={{ padding: "20px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10"
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg w-full flex flex-col items-center"
          style={{ maxWidth: "300px" }}
        >
          <Skeleton.Image
            active
            style={{
              width: isLargeDevice ? "300px" : "280px",
              height: "160px",
              borderRadius: "8px 8px 0px 0px",
            }}
          />

          <div className="w-full flex justify-center mt-4 ml-2">
            <Skeleton
              active
              title={false}
              paragraph={{ rows: 1, width: "90%" }}
              style={{ marginLeft: "10px" }}
            />
          </div>

          <Divider className="my-3" />

          <div className="flex gap-3 w-full border p-3">
            <Skeleton.Button active style={{ width: "120px" }} size="small" />
            <Skeleton.Button active style={{ width: "120px" }} size="small" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseSkeleton;
