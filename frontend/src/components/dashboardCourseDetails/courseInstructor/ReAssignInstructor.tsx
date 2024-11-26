import { useReAssignInstructorMutation } from "@/features/course";
import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { Avatar, Modal, Select } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const ReAssignInstructor = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const [isReAssign, setIsReAssign] = useState(false);
  const { data, isLoading } = useGetAllInstructorsQuery({});
  const [reAssign, { isLoading: isAssigning }] =
    useReAssignInstructorMutation();
  const instructors = (data?.data as IInstructor[]) || [];
  const [selectedInstructor, setSelectedInstructor] =
    useState<IInstructor | null>(null);

  const handleSelectInstructor = (instructorId: string) => {
    const instructor = instructors?.find(
      (instructor) => instructor?.id === instructorId
    );
    setSelectedInstructor(instructor as IInstructor);
  };

  const handleReAssignInstructor = async () => {
    try {
      const result: any = await reAssign({
        courseId,
        instructorId: selectedInstructor?.user?.id as string,
      });

      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Instructor assigned successfully!"
        );
        setIsReAssign(false);
      } else {
        toast.error(
          result?.data?.error?.message ||
            result?.error?.data?.message ||
            result?.error?.message ||
            "Failed to re-assign instructor"
        );
      }
    } catch (error: any) {
      toast.error(`Failed to re-assign instructor. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <FaEdit onClick={() => setIsReAssign(true)} className="cursor-pointer" />

      <Modal
        open={isReAssign}
        title="Re-Assign Instructor"
        okText={isAssigning ? "Assigning..." : "Re-Assign"}
        onCancel={() => setIsReAssign(false)}
        loading={isLoading}
        onOk={handleReAssignInstructor}
        maskClosable={!isAssigning}
        okButtonProps={{
          disabled: isAssigning,
          loading: isAssigning,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isAssigning }}
      >
        <div>
          <Select
            onChange={handleSelectInstructor}
            allowClear
            className="w-full"
            placeholder="Select instructor"
          >
            {instructors?.map((instructor) => (
              <Select.Option key={instructor?.id} value={instructor?.id}>
                {instructor?.user?.name}
              </Select.Option>
            ))}
          </Select>
          {selectedInstructor && (
            <div className="flex items-center gap-2 mt-4 border p-2 rounded-md">
              {selectedInstructor?.user?.image ? (
                <img
                  className="h-10 w-10 rounded-full ring-1"
                  src={selectedInstructor?.user?.image}
                  alt={selectedInstructor?.user?.name}
                />
              ) : (
                <Avatar className="h-10 w-10 rounded-full bg-blue-600 ring-1">
                  {selectedInstructor?.user?.name?.slice(0, 1)?.toUpperCase()}
                </Avatar>
              )}

              <div>
                <h3 className="text-lg font-semibold">
                  {selectedInstructor?.user?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedInstructor?.user?.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ReAssignInstructor;
