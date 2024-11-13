import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetStudentOrderHistoryQuery } from "@/features/enrollment";
import CertificateSkeleton from "@/skeletons/certificateSkeleton";
import { IEnrollmentOrder } from "@/types/enrollment.type";
import { IUser } from "@/types/user.type";
import { Button, Table, TableProps } from "antd/lib";
import { FaCertificate } from "react-icons/fa";

type TableDataType = {
  id: string;
  icon: JSX.Element;
  courseName: JSX.Element;
  price: JSX.Element;
  orderedOn: string;
  status: string;
  action: JSX.Element;
};

const OrderHistories = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetStudentOrderHistoryQuery({
    userId: user?.id,
  });
  const orders = data?.data as IEnrollmentOrder[];

  const tableDataCourse: TableDataType[] = orders?.map((enroll) => ({
    id: enroll?.id,
    icon: (
      <FaCertificate className="text-5xl text-purple-500 ring-2 rounded-full p-1 w-8 h-8" />
    ),
    courseName: (
      <h2 className="font-semibold lg:text-lg">{enroll?.courseName}</h2>
    ),
    price: <h2 className="font-semibold lg:text-lg">{enroll?.price}</h2>,
    orderedOn: new Date(enroll?.createdAt)?.toLocaleDateString(),
    status: enroll?.status,
    action:
      enroll?.status === "success" ? (
        <Button type="primary">Download Invoice</Button>
      ) : (
        <Button
          onClick={() => window.location.replace(enroll?.paymentSessionUrl)}
          className="bg-yellow-600 text-white"
          type="default"
        >
          Complete Payment
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
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Order On",
      dataIndex: "orderedOn",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "id",
    },
  ];

  return (
    <div className="p-2 lg:p-4">
      <h2 className="font-semibold mb-2 text-lg lg:text-xl">Order History</h2>
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

export default OrderHistories;
