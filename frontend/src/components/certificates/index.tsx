import { ICertificate } from "@/types/certificate.type";
import { Avatar, Table } from "antd/lib";
import Link from "next/link";
import CertificateDeleteButton from "./CertificateDeleteButton";

type Props = {
  certificates: ICertificate[];
  isLoading: boolean;
};

const CertificateTable = ({ certificates, isLoading }: Props) => {
  const columns = [
    {
      title: "Student",
      dataIndex: "user",
      key: "user",
      render: (user: ICertificate["user"], certificate: ICertificate) => (
        <div
          title={`Certificate name: ${certificate?.studentName}`}
          className="flex items-center space-x-3"
        >
          <Avatar src={user?.image} alt={user?.name} />
          <span>{user?.name}</span>
        </div>
      ),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course: ICertificate["course"], certificate: ICertificate) => (
        <div
          title={`Certificate name: ${certificate?.courseName}`}
          className="flex items-center space-x-3"
        >
          <img
            src={course?.image}
            alt={course?.title}
            className="w-10 h-10 object-cover rounded-md"
          />
          <span>{course?.title}</span>
        </div>
      ),
    },
    {
      title: "Certificate URL",
      dataIndex: "certificateUrl",
      key: "certificateUrl",
      render: (url: string) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Certificate
        </a>
      ),
    },
    {
      title: "Issued on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, certificate: ICertificate) => (
        <div className="flex space-x-3">
          <Link
            href={`/dashboard/certificates/update/${certificate?.id}/${certificate?.user?.id}/${certificate?.course?.id}?studentName=${certificate?.user?.name}&courseName=${certificate?.course?.title}`}
          >
            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </Link>
          <CertificateDeleteButton certificateId={certificate?.id} />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={certificates}
      rowKey={(record) => record?.id}
      loading={isLoading}
      className="shadow-md rounded-lg w-full min-w-[900px]"
    />
  );
};

export default CertificateTable;