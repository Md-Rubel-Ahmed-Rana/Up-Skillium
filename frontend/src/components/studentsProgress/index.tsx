import { useGetAllStudentsProgressQuery } from "@/features/studentProgress";
import { IStudentCourseProgress } from "@/types/studentProgress.type";
import { Avatar, Table, Tag, Tooltip } from "antd/lib";

const StudentsProgress = () => {
  const { data, isLoading } = useGetAllStudentsProgressQuery({});
  const studentProgresses = data?.data as IStudentCourseProgress[];
  const columns = [
    {
      title: "Student",
      dataIndex: ["user", "name", "image"],
      key: "name",
      render: (_: any, progress: IStudentCourseProgress) => (
        <div className="flex items-center gap-2">
          {progress?.user?.image ? (
            <img
              className="w-12 h-12 object-cover rounded-full ring-1"
              src={progress?.user?.image}
              alt={progress?.user?.name}
            />
          ) : (
            <Avatar className="w-12 h-12 object-cover rounded-full ring-1">
              {progress?.user?.name?.slice(0, 1)?.toUpperCase()}
            </Avatar>
          )}

          <span className="font-medium">{progress?.user?.name}</span>
        </div>
      ),
    },
    {
      title: "Course",
      dataIndex: "courses",
      key: "courses",
      render: (_: any, progress: IStudentCourseProgress) => {
        const courses: any = progress?.courses;
        return (
          <div className="flex  flex-col gap-2">
            {courses?.map((course: any) => (
              <div className="flex items-center gap-2" key={course?.course?.id}>
                {course?.course?.image ? (
                  <img
                    src={course?.course?.image}
                    alt={course?.course?.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <Avatar>
                    {course?.course?.title?.slice(0, 1)?.toUpperCase()}
                  </Avatar>
                )}

                <p className="font-semibold">{course?.course?.title}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "Completion",
      dataIndex: "courses",
      key: "completion",
      render: (_: any, progress: IStudentCourseProgress) => {
        const courses: any = progress?.courses;
        return (
          <div className="flex  flex-col justify-center items-center gap-2">
            {courses?.map((course: any) => (
              <Tooltip
                key={course?.course?.id}
                title={`${course?.completionPercentage}% completed`}
              >
                <Tag
                  color={course?.isCourseCompleted ? "green" : "blue"}
                  className="rounded-md"
                >
                  {course?.completionPercentage}%
                </Tag>
              </Tooltip>
            ))}
          </div>
        );
      },
    },
    {
      title: "Last Completed Lesson",
      dataIndex: "courses",
      key: "lastCompletedLesson",
      render: (_: any, progress: IStudentCourseProgress) => {
        const courses: any = progress?.courses;
        return (
          <div className="flex  flex-col justify-between gap-2">
            {courses?.map((course: any) => (
              <div className="flex items-center gap-2" key={course?.course?.id}>
                <p className="font-semibold">
                  {course?.lastCompletedLesson?.title || "No lesson found"}
                </p>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="lg:p-4 p-2 mt-4 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-6">Student Progress</h1>
      <Table
        dataSource={studentProgresses}
        columns={columns}
        rowKey={(record) => record?.id}
        pagination={{ pageSize: 5 }}
        className="w-full"
        loading={isLoading}
      />
    </div>
  );
};

export default StudentsProgress;
