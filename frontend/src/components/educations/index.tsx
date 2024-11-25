import { IEducation } from "@/types/education.type";
import { Table, TableProps } from "antd/lib";
import EducationActions from "./EducationActions";

type Props = {
  educations: IEducation[];
  isLoading: boolean;
};

const EducationTable = ({ educations, isLoading }: Props) => {
  const columns: TableProps<IEducation>["columns"] = [
    {
      title: "Institution",
      dataIndex: "institution",
      key: "institution",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Study Field",
      dataIndex: "fieldOfStudy",
      key: "fieldOfStudy",
    },
    {
      title: "Starts",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate: string) => new Date(startDate).toLocaleDateString(),
    },
    {
      title: "Ends",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Date, education: IEducation) => (
        <div>
          {education?.isCurrent
            ? "Currently studying"
            : new Date(endDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, education: IEducation) => (
        <EducationActions education={education} />
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={educations}
      rowKey={(education) => education?.id}
      loading={isLoading}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      pagination={false}
      bordered
    />
  );
};

export default EducationTable;
