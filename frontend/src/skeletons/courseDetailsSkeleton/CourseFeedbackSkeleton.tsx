import { Skeleton } from "antd/lib";
import { useMediaQuery } from "react-responsive";

const CourseFeedbackSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "992px" });
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border rounded-md p-2">
          <div className="flex items-center gap-4">
            <Skeleton.Avatar
              className="w-full"
              active
              size="large"
              shape="circle"
            />
            <div className="w-full">
              <Skeleton
                active
                title={false}
                paragraph={{
                  rows: 1,
                  width: isLargeDevice ? "50%" : "100%",
                }}
                style={{
                  width: "100%",
                }}
                className="mt-3"
              />
              <Skeleton
                active
                title={false}
                paragraph={{
                  rows: 1,
                  width: isLargeDevice ? "40%" : "80%",
                }}
                style={{
                  width: "100%",
                }}
                className="mt-3"
              />
            </div>
          </div>
          <Skeleton
            active
            title={false}
            paragraph={{
              rows: 1,
              width: isLargeDevice ? "80%" : "100%",
            }}
            style={{
              width: "100%",
            }}
            className="mt-3"
          />
        </div>
      ))}
    </div>
  );
};

export default CourseFeedbackSkeleton;