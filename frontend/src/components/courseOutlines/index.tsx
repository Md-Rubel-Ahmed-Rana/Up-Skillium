import { useGetAllCoursesQuery } from "@/features/course";
import { useGetAllCourseOutlinesQuery } from "@/features/courseOutline";
import { ICourseOutline, IModuleOutline } from "@/types/courseOutline.type";
import { Avatar, Table } from "antd/lib";

const CourseOutlines = () => {
  const { data, isLoading } = useGetAllCourseOutlinesQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});
  console.log(courseData);
  const courseOutlines = data?.data as ICourseOutline[];

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
      render: (createdAt: Date) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: Date) => new Date(updatedAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="lg:p-5 px-2 pb-20">
      <h1 className="text-2xl font-semibold mb-5">All Course Outlines</h1>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={courseOutlines}
          rowKey={(record) => record?.id}
          loading={isLoading}
          className="shadow-md rounded-lg w-full min-w-[900px]"
          expandable={{
            expandedRowRender: (outline) => (
              <div className="bg-gray-50 p-2">
                <h3 className="font-semibold">Modules</h3>
                {outline?.modules?.length ? (
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
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CourseOutlines;
