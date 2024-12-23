import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  moduleTitle: string;
  moduleId: string;
  isButton?: boolean;
  buttonSize?: "small" | "middle" | "large";
  buttonText?: string;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonStyles?: string;
  spanStyles?: string;
};

const DeleteModuleModal = ({
  moduleId,
  moduleTitle,
  buttonSize,
  buttonStyles,
  buttonText = "Delete",
  buttonType = "primary",
  isButton,
  spanStyles,
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {isButton ? (
        <Button
          type={buttonType}
          size={buttonSize}
          onClick={() => setShow(true)}
          className={buttonStyles}
          danger
        >
          {buttonText}
        </Button>
      ) : (
        <span onClick={() => setShow(true)} className={spanStyles}>
          {buttonText}
        </span>
      )}

      <Modal
        title={`Delete '${moduleTitle}' Module`}
        open={show}
        onCancel={() => setShow(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete <b>{`'${moduleTitle}'`}</b> module?
        </p>
      </Modal>
    </>
  );
};

export default DeleteModuleModal;
