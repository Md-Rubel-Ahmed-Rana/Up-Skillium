import { useCreateModuleMutation } from "@/features/module";
import { ICreateModule } from "@/types/module.type";
import { Button, Modal } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

interface DataType {
  id: string;
  key: string;
  serial: number;
  title: string;
}

type Props = {
  modules: DataType[];
};

const ModulesSaveButton = ({ modules }: Props) => {
  const { query, push } = useRouter();
  const courseId = query?.courseId as string;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createModule, { isLoading }] = useCreateModuleMutation();

  const handleCreateModules = async () => {
    if (courseId) {
      const newModules: ICreateModule[] = modules.map((module) => ({
        serial: module?.serial,
        title: module?.title,
        course: courseId,
      }));
      await handleCreateCourseOutline(newModules);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCourseOutline = async (data: ICreateModule[]) => {
    try {
      const result: any = await createModule({ modules: data });
      if (result?.data?.statusCode === 201) {
        toast.success(result?.data?.message || "Modules created successfully!");
        push("/dashboard/manage-modules");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create module."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create module. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button
        disabled={modules?.length <= 0 || isLoading}
        htmlType="button"
        onClick={handleCreateModules}
        type="primary"
        loading={isLoading}
        iconPosition="end"
      >
        {isLoading ? "Creating module" : "Create Module"}
      </Button>
      <Modal
        title="Error: No Course Selected"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="ok" type="primary" onClick={handleCloseModal}>
            OK
          </Button>,
        ]}
      >
        <p style={{ fontSize: "16px", color: "red" }}>
          You didn&apos;t select a course. Please select a course first before
          create modules.
        </p>
      </Modal>
    </>
  );
};

export default ModulesSaveButton;
