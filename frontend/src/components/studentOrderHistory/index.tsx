import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetStudentEnrollmentsQuery } from "@/features/enrollment";
import CertificateSkeleton from "@/skeletons/certificateSkeleton";
import { IEnrollment } from "@/types/enrollment.type";
import { IUser } from "@/types/user.type";
import { Button, Table, TableProps } from "antd/lib";

const OrderHistories = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetStudentEnrollmentsQuery({
    userId: user?.id,
  });
  const orders = data?.data as IEnrollment[];

  const columns: TableProps<IEnrollment>["columns"] = [
    {
      title: "Image",
      dataIndex: "course",
      render: (course) => (
        <img
          className="h-10 w-10 rounded-full"
          src={course?.image}
          alt={course?.title}
        />
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "id",
      className: "font-semibold",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Order At",
      dataIndex: "createdAt",
      render: (enrolledAt: Date) => (
        <p>{new Date(enrolledAt).toLocaleString()}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "invoice",
      render: (invoice: string) => (
        <Button onClick={() => window.location.replace(invoice)} type="primary">
          Download Invoice
        </Button>
      ),
    },
  ];

  return (
    <div className="p-2 lg:p-0 mt-3">
      <h2 className="font-semibold mb-2 text-lg lg:text-xl">Order History</h2>
      {isLoading ? (
        <CertificateSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={orders}
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
