import { IEnrollment } from "@/types/enrollment.type";
import { IUser } from "@/types/user.type";
import { Button, Modal, Table, TableProps, Tooltip } from "antd/lib";
import { useState } from "react";

type Props = {
  enrollments: IEnrollment[];
};

const PaymentTable = ({ enrollments }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    sessionId: string | null;
    sessionUrl: string | null;
  }>({ sessionId: null, sessionUrl: null });

  const openModal = (sessionId: string, sessionUrl: string) => {
    setModalData({ sessionId, sessionUrl });
    setIsModalOpen(true);
  };

  const columns: TableProps<IEnrollment>["columns"] = [
    {
      title: "Student",
      dataIndex: "user",
      key: "user",
      render: (user: IUser) => (
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full ring-1"
            src={user?.image}
            alt={user?.name}
          />
          <h4>{user?.name}</h4>
        </div>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Order On",
      dataIndex: "createdAt",
      render: (createdAt: Date) => new Date(createdAt).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payments",
      key: "status",
      render: (_, enrollment: IEnrollment) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Click to view session ID and URL">
            <Button
              onClick={() =>
                openModal(
                  enrollment?.paymentSessionId,
                  enrollment?.paymentSessionUrl
                )
              }
            >
              View Details
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={enrollments}
          rowKey="id"
          pagination={false}
          bordered
          className="w-full min-w-[500px] md:min-w-[700px] lg:min-w-[900px]"
        />
      </div>

      <Modal
        title="Payment Session Details"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div className="space-y-4">
          <div>
            <strong>Session ID:</strong>
            <p className="break-all">{modalData.sessionId}</p>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(modalData.sessionId || "")
              }
            >
              Copy Session ID
            </Button>
          </div>
          <div>
            <strong>Session URL:</strong>
            <p className="break-all">{modalData.sessionUrl}</p>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(modalData.sessionUrl || "")
              }
            >
              Copy Session URL
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentTable;
