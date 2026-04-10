import { Skeleton, Typography } from "antd/lib";

type Props = {
  cardTitle: string;
};

const InfoContainer = ({ cardTitle }: Props) => {
  return (
    <div>
      <Typography.Title level={4}>{cardTitle}</Typography.Title>
      <div className="flex mb-4">
        {Array.from({ length: 4 }).map((item, index) => (
          <div key={index} style={{ width: "100%" }}>
            <Skeleton active paragraph={{ rows: 0 }} />
          </div>
        ))}
      </div>
      <div className="flex">
        {Array.from({ length: 4 }).map((item, index) => (
          <div key={index} style={{ width: "100%" }}>
            <Skeleton active paragraph={{ rows: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoContainer;
