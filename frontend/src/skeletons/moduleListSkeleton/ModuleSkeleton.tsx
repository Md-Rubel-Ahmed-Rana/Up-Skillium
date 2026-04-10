import { Skeleton } from "antd/lib";

const ModuleSkeleton = () => {
  return (
    <div className="w-full border rounded-md flex justify-center items-center p-2">
      <Skeleton.Button active style={{ width: "420px" }} />
    </div>
  );
};

export default ModuleSkeleton;
