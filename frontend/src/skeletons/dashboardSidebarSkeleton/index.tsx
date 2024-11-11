import { Skeleton } from "antd/lib";

const DashboardSidebarSkeleton = () => {
  return (
    <div
      style={{ width: "200px" }}
      className="flex lg:w-full w-screen min-w-6 lg:flex-col  items-center gap-5 p-2 mt-4 flex-row overflow-x-auto lg:overflow-visible space-x-3"
    >
      {Array.from({ length: 20 }).map((item, index) => (
        <div key={index} className="flex items-center gap-2 w-full">
          <div className="w-full">
            <Skeleton.Button
              active
              size={"small"}
              shape="circle"
              className="w-full"
              style={{ width: "10px" }}
            />
          </div>
          <div className="w-full">
            <Skeleton.Button
              active
              size={"small"}
              className="w-full"
              style={{ width: "150px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebarSkeleton;
