import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllEducationsByUserQuery } from "@/features/education";
import { IEducation } from "@/types/education.type";
import { IUser } from "@/types/user.type";
import { Button, Table } from "antd/lib";
import { FaPlus } from "react-icons/fa";

const Educations = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllEducationsByUserQuery({
    userId: user?.id,
  });
  const educations = (data?.data || []) as IEducation[];
  const eduData = Array.from({ length: 5 }).map((_, index) => ({
    id: (index + 1).toString(),
    institute: `Institute ${index + 1}`,
    degree: `Degree ${index + 1}`,
    status: "passed",
    start: new Date(),
    end: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

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
      title: "Actions",
      key: "actions",
      render: (_: any, education: IEducation) => (
        <div className="flex space-x-3">
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
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-lg lg:text-2xl font-semibold">Educations</h2>
        <Button
          size="small"
          icon={<FaPlus />}
          iconPosition="start"
          type="primary"
        >
          Add
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={eduData}
          rowKey={(education) => education?.id}
          loading={isLoading}
          className="shadow-md rounded-lg w-full min-w-[900px]"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Educations;
