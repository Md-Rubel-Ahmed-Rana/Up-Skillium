import { Skeleton } from "antd/lib";
import { useMediaQuery } from "react-responsive";

const PriceDetailSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "768px" });
  return (
    <div className="w-full flex flex-col justify-between p-4">
      <Skeleton.Input
        active={true}
        style={{
          width: isLargeDevice ? 200 : 150,
          height: 24,
          marginBottom: 12,
        }}
      />
      <Skeleton
        paragraph={{ rows: 2 }}
        active={true}
        style={{ marginBottom: 24 }}
      />

      <Skeleton.Input
        active={true}
        style={{ width: 150, height: 24, marginBottom: 12 }}
      />
      <div className="flex gap-2 mb-6">
        <Skeleton.Button
          active={true}
          shape="round"
          style={{ width: isLargeDevice ? 200 : 120, height: 40 }}
        />
        <Skeleton.Button
          active={true}
          shape="round"
          style={{ width: isLargeDevice ? 200 : 120, height: 40 }}
        />
      </div>

      <Skeleton.Button
        active={true}
        block={true}
        shape="round"
        style={{ height: 40 }}
      />
    </div>
  );
};

export default PriceDetailSkeleton;
