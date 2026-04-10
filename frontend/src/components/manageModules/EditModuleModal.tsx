import { useUpdateModuleMutation } from "@/features/module";
import { IGetModule } from "@/types/module.type";
import { Button, Form, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  module: IGetModule;
  isButton?: boolean;
  buttonSize?: "small" | "middle" | "large";
  buttonText?: string;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
  buttonStyles?: string;
  spanStyles?: string;
};

const EditModuleModal = ({
  module,
  isButton,
  buttonSize,
  buttonText = "Edit",
  buttonType = "primary",
  buttonStyles,
  spanStyles,
}: Props) => {
  const [show, setShow] = useState(false);
  const [updateModule, { isLoading }] = useUpdateModuleMutation();

  const handleUpdateModule = async (values: {
    title: string;
    serial: number;
  }) => {
    try {
      const response: any = await updateModule({
        moduleId: module?.id,
        module: values,
      });
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        setShow(false);
      } else {
        toast.error(
          response?.data?.message ||
            response?.data?.error?.message ||
            response?.error?.message ||
            "Failed to update module"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.data?.error?.message ||
          error?.error?.message ||
          "Failed to update module"
      );
    }
  };

  return (
    <>
      {isButton ? (
        <Button
          type={buttonType}
          size={buttonSize}
          onClick={() => setShow(true)}
          className={buttonStyles}
        >
          {buttonText}
        </Button>
      ) : (
        <span onClick={() => setShow(true)} className={spanStyles}>
          {buttonText}
        </span>
      )}

      <Modal
        title="Edit Module"
        open={show}
        footer={false}
        onCancel={() => setShow(false)}
        maskClosable={!isLoading}
      >
        <Form
          name="editModule"
          onFinish={handleUpdateModule}
          initialValues={{
            title: module?.title,
            serial: module?.serial,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input the module title!" },
            ]}
          >
            <Input type="text" name="title" />
          </Form.Item>
          <Form.Item
            label="Serial"
            name="serial"
            rules={[
              { required: true, message: "Please input the module serial!" },
            ]}
          >
            <Input type="number" name="serial" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between items-center">
              <Button
                type="default"
                htmlType="button"
                onClick={() => setShow(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                iconPosition="end"
              >
                {isLoading ? "Updating..." : "Save changes"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditModuleModal;
