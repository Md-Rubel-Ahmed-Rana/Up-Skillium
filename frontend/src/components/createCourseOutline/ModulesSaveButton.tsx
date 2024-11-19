import {
  ICreateModuleOutline,
  ICreateOutline,
} from "@/types/courseOutline.type";
import { Button, Modal } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";

interface DataType {
  id: string;
  key: string;
  serial: number;
  name: string;
}

type Props = {
  modules: DataType[];
};

const ModulesSaveButton = ({ modules }: Props) => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateModules = () => {
    if (courseId) {
      const newModules: ICreateModuleOutline[] = modules.map((module) => ({
        serial: module?.serial,
        name: module?.name,
      }));
      const outline: ICreateOutline = {
        course: courseId,
        modules: newModules,
      };

      console.log(outline);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        disabled={modules?.length <= 0}
        htmlType="button"
        onClick={handleCreateModules}
        type="primary"
      >
        Save Modules
      </Button>
      <Modal
        title="Error: No Course Selected"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseModal}>
            OK
          </Button>,
        ]}
      >
        <p style={{ fontSize: "16px", color: "red" }}>
          You didn&apos;t select a course. Please select a course first before
          saving modules.
        </p>
      </Modal>
    </>
  );
};

export default ModulesSaveButton;
