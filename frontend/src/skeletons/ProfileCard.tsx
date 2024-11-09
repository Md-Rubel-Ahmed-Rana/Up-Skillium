import { Skeleton } from "antd/lib";

const ProfileCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row items-center gap-5">
      <div>
        <Skeleton.Avatar active size={100} shape={"circle"} />
      </div>
      <div className="w-full mt-6">
        <Skeleton active paragraph={{ rows: 0 }} />
        <div style={{ width: "300px" }}>
          <Skeleton active paragraph={{ rows: 0 }} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
