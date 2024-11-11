import { Skeleton } from "antd/lib";

const CertificateSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((item, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between border p-2 rounded-md"
        >
          <div className="w-full -mb-5">
            <Skeleton active paragraph={{ rows: 0 }} className="mt-4" />
          </div>
          <div>
            <Skeleton.Button
              active
              size="small"
              className="-mt-2"
              style={{ width: "100px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificateSkeleton;
