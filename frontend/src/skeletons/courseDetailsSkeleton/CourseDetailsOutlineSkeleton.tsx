import { Divider, Skeleton } from "antd/lib";

const CourseDetailsOutlineSkeleton = () => {
  return (
    <div className="w-full border rounded-md p-2">
      {/* course card start */}
      <div className="w-full flex justify-center">
        <Skeleton.Image
          active
          style={{
            width: "400px",
            height: "250px",
          }}
        />
      </div>
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
        className="my-5"
      />
      <div className="w-full flex items-center gap-3">
        <Skeleton.Button size="small" active block style={{ width: "100%" }} />
        <Skeleton.Button size="small" active block style={{ width: "100%" }} />
      </div>
      <Skeleton.Button
        size="large"
        active
        block
        className="mt-3"
        style={{ width: "100%" }}
      />
      {/* course card end */}
      {/* course outline start */}
      <Divider />
      {/* course outline end */}
      <div className="flex flex-col gap-3">
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
        {Array.from({ length: 20 }).map((_, index) => {
          const randomWidth = `${
            Math.floor(Math.random() * (90 - 50 + 1)) + 60
          }%`;
          return (
            <Skeleton
              key={index}
              active
              title={false}
              paragraph={{
                rows: 1,
                width: randomWidth,
              }}
              style={{
                width: randomWidth,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetailsOutlineSkeleton;
