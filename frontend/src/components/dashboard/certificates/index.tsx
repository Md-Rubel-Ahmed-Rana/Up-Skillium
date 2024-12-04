import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetStudentCertificatesQuery } from "@/features/certificate";
import CertificateSkeleton from "@/skeletons/certificateSkeleton";
import { ICertificate } from "@/types/certificate.type";
import { IUser } from "@/types/user.type";
import { Button, Table, TableProps } from "antd/lib";
import { PiCertificateFill } from "react-icons/pi";

type TableDataType = {
  id: string;
  icon: JSX.Element;
  courseName: JSX.Element;
  issueDate: string;
  lastUpdated: string;
  action: JSX.Element;
};

const StudentCertificates = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetStudentCertificatesQuery({
    userId: user?.id,
  });
  const certificates = data?.data as ICertificate[];

  const tableDataCourse: TableDataType[] = certificates?.map((ct) => ({
    id: ct?.id,
    icon: (
      <PiCertificateFill className="text-5xl text-purple-500 ring-2 rounded-full p-1 w-8 h-8" />
    ),
    courseName: (
      <h2 className="font-semibold lg:text-lg">{ct?.course?.title}</h2>
    ),
    issueDate: new Date(ct?.createdAt)?.toLocaleDateString(),
    lastUpdated: new Date(ct?.updatedAt)?.toLocaleDateString(),
    action: (
      <Button onClick={() => window.open(ct?.certificateUrl)} type="primary">
        Download
      </Button>
    ),
  }));

  const columns: TableProps<TableDataType>["columns"] = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "id",
      responsive: ["lg", "md"],
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "id",
    },
    {
      title: "Issued On",
      dataIndex: "issueDate",
      key: "id",
    },
    {
      title: "Last Updated At",
      dataIndex: "lastUpdated",
      key: "id",
      responsive: ["lg", "md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "id",
    },
  ];

  return (
    <div className="p-2 lg:p-4">
      <h2 className="font-semibold mb-2 text-lg lg:text-xl">
        Student Certificates
      </h2>
      {isLoading ? (
        <CertificateSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <Table<TableDataType>
            columns={columns}
            dataSource={tableDataCourse}
            rowKey="id"
            pagination={false}
            bordered
            className="w-full min-w-[500px] md:min-w-[700px] lg:min-w-[900px]"
          />
        </div>
      )}
    </div>
  );
};

export default StudentCertificates;
