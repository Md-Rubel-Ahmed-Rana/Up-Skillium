import { IGetLiveClass } from "@/types/liveClass.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  liveClass: IGetLiveClass;
};

const DeleteLiveClass = ({ liveClass }: Props) => {
  const [isDeleteClass, setIsDeleteClass] = useState(false);
  const handleDeleteLiveClass = () => {
    console.log("Delete live class");
    setIsDeleteClass(false);
  };
  return (
    <>
      <Button onClick={() => setIsDeleteClass(true)} type="primary" danger>
        Delete
      </Button>

      <Modal
        open={isDeleteClass}
        onCancel={() => setIsDeleteClass(false)}
        onOk={handleDeleteLiveClass}
        title={`Delete ${liveClass?.title} ?`}
        okButtonProps={{ danger: true }}
        okText="Delete"
      >
        <p>Are you sure you want to delete {liveClass?.title}?</p>
      </Modal>
    </>
  );
};

export default DeleteLiveClass;
