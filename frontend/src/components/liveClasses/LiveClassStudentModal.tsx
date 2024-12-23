import { IUser } from "@/types/user.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";

type Props = {
  students: IUser[];
  title: string;
};

const LiveClassStudentModal = ({ title, students = [] }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        size="small"
        className="bg-yellow-400 w-full"
      >
        Students
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="space-y-2">
          {students.map((student) => (
            <div
              key={student?.id}
              className="flex items-center gap-2 p-2 border rounded-md"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full rounded-full ring-1"
                  src={student?.id}
                  alt={student?.name}
                />
              </div>
              <div>
                <p className="text-md font-semibold">{student?.name}</p>
                <p>{student?.email}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default LiveClassStudentModal;
