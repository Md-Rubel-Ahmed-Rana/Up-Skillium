import { useGetAllEducationsQuery } from "@/features/education";
import { IEducation } from "@/types/education.type";
import { Button, Table } from "antd/lib";

const ManageEducations = () => {
  const { data, isLoading } = useGetAllEducationsQuery({});
  const educations = (data?.data || []) as IEducation[];
  console.log(educations);

  const columns = [
    {
      title: "Institute",
      dataIndex: "institute",
      key: "institute",
      render: (institute: string) => <h4>{institute}</h4>,
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      render: (degree: string) => <h5>{degree}</h5>,
    },
    {
      title: "Starts",
      dataIndex: "start",
      key: "start",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Ends",
      dataIndex: "end",
      key: "end",
      render: (date: Date, education: IEducation) => (
        <div>
          {education?.status === "passed"
            ? new Date(date).toLocaleDateString()
            : "Currently studying"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <h6>{status}</h6>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, education: IEducation) => (
        <div className="flex items-center gap-2">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Educations
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={educations}
          rowKey={(education) => education?.id}
          loading={isLoading}
          bordered
          className="shadow-md rounded-lg w-full min-w-[900px]"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ManageEducations;
