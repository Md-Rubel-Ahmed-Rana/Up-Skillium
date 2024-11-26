import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { Avatar, Modal, Select } from "antd/lib";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ReAssignInstructor = () => {
  const [isReAssign, setIsReAssign] = useState(false);
  const { data, isLoading } = useGetAllInstructorsQuery({});
  const instructors = (data?.data as IInstructor[]) || [];
  const [selectedInstructor, setSelectedInstructor] =
    useState<IInstructor | null>(null);

  const handleSelectInstructor = (instructorId: string) => {
    const instructor = instructors?.find(
      (instructor) => instructor?.id === instructorId
    );
    setSelectedInstructor(instructor as IInstructor);
  };

  return (
    <>
      <FaEdit onClick={() => setIsReAssign(true)} className="cursor-pointer" />

      <Modal
        open={isReAssign}
        title="Re-Assign Instructor"
        okText="Re-Assign"
        onCancel={() => setIsReAssign(false)}
        loading={isLoading}
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
