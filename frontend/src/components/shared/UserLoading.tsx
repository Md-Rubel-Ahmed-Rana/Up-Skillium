import { LoadingOutlined } from "@ant-design/icons/lib";
import { Button, Spin } from "antd/lib";

const UserLoading = () => {
  return (
    <Button className="p-2">
      <Spin indicator={<LoadingOutlined spin />} />
    </Button>
  );
};

export default UserLoading;
