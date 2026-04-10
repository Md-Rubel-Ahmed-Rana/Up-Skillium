import { ICourse } from "@/types/course.type";
import { ICourseOutline, IModuleOutline } from "@/types/courseOutline.type";
import { Avatar, Button, Table } from "antd/lib";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

type Props = {
  outlines: ICourseOutline[];
  isLoading: boolean;
  courses: ICourse[];
};

const CourseOutlineTable = ({ outlines, isLoading, courses }: Props) => {
  const coursesNoOutline = courses?.filter(
    (course) => !outlines?.some((outline) => outline?.course?.id === course?.id)
  );
  const newOutlines: ICourseOutline[] = coursesNoOutline?.map((course) => ({
    id: uuidv4(),
    course: { id: course?.id, title: course?.title, image: course?.image },
    modules: [],
    createdAt: null,
    updatedAt: null,
  }));
  const columns = [
    {
      title: "Image",
      dataIndex: ["course", "image"],
      key: "image",
      render: (image: string, outline: ICourseOutline) => (
        <div className="flex items-center space-x-3">
          <Avatar src={image} alt={outline?.course?.title} />
        </div>
      ),
    },
    {
      title: "Course Title",
      dataIndex: ["course", "title"],
      key: "title",
    },
    {
      title: "Modules",
      dataIndex: ["modules"],
      key: "modules",
      render: (modules: IModuleOutline[]) => <p>{modules?.length}</p>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : "No date",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: Date) =>
        updatedAt ? new Date(updatedAt).toLocaleDateString() : "No date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_id: any, outline: ICourseOutline) => (
        <Link
          href={`/dashboard/course/edit-course-outline/${outline?.id}/${outline?.course?.id}?courseName=${outline?.course?.title}`}
        >
          <Button type="primary">Edit</Button>
        </Link>
      ),
    },
  ];
  const handleShowModules = (outline: ICourseOutline) => {
    return (
      <div className="bg-gray-50 p-2">
        <h3 className="font-semibold">Modules</h3>
        {outline?.modules?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {outline?.modules.map((module: IModuleOutline) => (
              <div
                className="flex justify-between bg-white p-2 rounded-md"
                key={module?.id}
              >
                <h4 className="w-2/12">Serial: {module?.serial}</h4>
                <h3 className="w-6/12">Title: {module?.name}</h3>
                <h3 className="w-2/12">
                  <span> CreatedAt:</span>
                  <span>
                    {new Date(module?.createdAt)?.toLocaleDateString()}
                  </span>
                </h3>
                <h3 className="w-2/12">
                  <span> UpdatedAt: </span>
                  <span>
                    {new Date(module?.updatedAt)?.toLocaleDateString()}
                  </span>
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No modules available.</p>
        )}
      </div>
    );
  };
  return (
    <Table
      columns={columns}
      dataSource={outlines?.concat(newOutlines)}
      rowKey={(record) => record?.id}
      loading={isLoading}
      pagination={{ pageSize: 5 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      expandable={{ expandedRowRender: handleShowModules }}
      locale={{ emptyText: "No course outline found" }}
    />
  );
};

export default CourseOutlineTable;
