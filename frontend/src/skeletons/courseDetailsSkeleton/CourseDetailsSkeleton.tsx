import { Skeleton } from "antd";
import { FaPlay } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import CourseFeedbackSkeleton from "./CourseFeedbackSkeleton";

const CourseDetailsSkeleton = () => {
  const isLargeDevice = useMediaQuery({ minWidth: "992px" });
  return (
    <div
      style={{ width: isLargeDevice ? "800px" : "320px", margin: "0px auto" }}
    >
      <div className="border w-full p-2 rounded-md">
        <div className="w-full flex justify-center relative">
          <Skeleton.Image
            active
            style={{
              width: isLargeDevice ? "780px" : "300px",
              height: isLargeDevice ? "300px" : "180px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 p-4 rounded-full">
              <FaPlay className="text-white text-4xl" />
            </div>
          </div>
        </div>
        <div>
          <Skeleton
            active
            title={false}
            paragraph={{
              rows: 1,
              width: "70%",
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
              width: "45%",
            }}
            style={{
              width: "100%",
            }}
            className="mt-3"
          />
          <Skeleton.Button
            active
            block
            shape="square"
            style={{
              width: "35%",
            }}
            className="mt-3"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-5 border rounded-md p-2">
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
              width: "50%",
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
              width: "40%",
            }}
            style={{
              width: "100%",
            }}
            className="mt-3"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 my-5 border p-2 rounded-md">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            style={{ width: isLargeDevice ? "500px" : "300px" }}
            key={index}
            className=" flex items-center gap-2"
          >
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 1,
                width: "100%",
              }}
              style={{
                width: "100%",
              }}
            />
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 1,
                width: "100%",
              }}
              style={{
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <div className="border p-2 rounded-md">
        <CourseFeedbackSkeleton />
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
