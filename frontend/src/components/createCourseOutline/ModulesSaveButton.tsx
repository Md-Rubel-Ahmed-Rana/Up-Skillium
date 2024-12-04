import { useCreateCourseOutlineMutation } from "@/features/courseOutline";
import {
  ICreateModuleOutline,
  ICreateOutline,
} from "@/types/courseOutline.type";
import { Button, Modal } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const { query, push } = useRouter();
  const courseId = query?.courseId as string;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createOutline, { isLoading }] = useCreateCourseOutlineMutation();

  const handleCreateModules = async () => {
    if (courseId) {
      const newModules: ICreateModuleOutline[] = modules.map((module) => ({
        serial: module?.serial,
        name: module?.name,
      }));
      const outline: ICreateOutline = {
        course: courseId,
        modules: newModules,
      };
      await handleCreateCourseOutline(outline);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateCourseOutline = async (data: ICreateOutline) => {
    try {
      const result: any = await createOutline({ data: data });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Course outline created successfully!"
        );
        push("/dashboard/course-outlines");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create course outline."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create course outline. Error: ${error?.message}`);
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
        {isLoading ? "Creating outline" : "Create outline"}
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
          saving modules.
        </p>
      </Modal>
    </>
  );
};

export default ModulesSaveButton;
