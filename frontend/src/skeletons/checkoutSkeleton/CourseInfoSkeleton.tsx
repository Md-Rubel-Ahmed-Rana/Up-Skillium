import { Skeleton, Space } from "antd/lib";
import { useMediaQuery } from "react-responsive";

const CourseInfoSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "768px" });
  return (
    <div className="w-full flex flex-col gap-5 p-4">
      <Skeleton.Input
        active={true}
        style={{
          width: isLargeDevice ? 300 : 250,
          height: 24,
          marginBottom: 12,
        }}
      />
      <Skeleton.Image
        active={true}
        style={{
          width: isLargeDevice ? "300px" : "250px",
          height: 180,
          margin: "0px auto",
        }}
      />
      <Skeleton.Input
        active={true}
        style={{ width: 150, height: 20, marginBottom: 12 }}
      />
      <Space>
        <Skeleton.Button
          active={true}
          shape="round"
          style={{ width: 50, height: 24 }}
        />
        <Skeleton.Button
          active={true}
          shape="round"
          style={{ width: 50, height: 24 }}
        />
        <Skeleton.Button
          active={true}
          shape="round"
          style={{ width: 70, height: 24 }}
        />
      </Space>
    </div>
  );
};

export default CourseInfoSkeleton;
