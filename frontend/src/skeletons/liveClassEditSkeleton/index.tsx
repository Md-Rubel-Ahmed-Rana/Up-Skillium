import { Skeleton } from "antd/lib";

const LiveClassEditSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 mt-5">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default LiveClassEditSkeleton;
