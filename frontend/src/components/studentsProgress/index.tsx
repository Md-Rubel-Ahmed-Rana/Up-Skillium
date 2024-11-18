import { useGetAllStudentsProgressQuery } from "@/features/studentProgress";
import { IStudentCourseProgress } from "@/types/studentProgress.type";
import { Table, Tag, Tooltip } from "antd/lib";

const StudentsProgress = () => {
  const { data, isLoading } = useGetAllStudentsProgressQuery({});
  const studentProgresses = data?.data as IStudentCourseProgress[];
  const columns = [
    {
      title: "Progress ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Course",
      dataIndex: "courses",
      key: "courses",
      render: (courses: IStudentCourseProgress["courses"]) => (
        <div className="flex items-center space-x-4">
          <img
            src={courses?.course?.image}
            alt={courses?.course?.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="font-semibold">{courses?.course?.title}</p>
            <p className="text-xs text-gray-500">ID: {courses?.course?.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Completion",
      dataIndex: "courses",
      key: "completion",
      render: (courses: IStudentCourseProgress["courses"]) => (
        <Tooltip title={`${courses?.completionPercentage}% completed`}>
          <Tag
            color={courses?.isCourseCompleted ? "green" : "blue"}
            className="rounded-md"
          >
            {courses?.completionPercentage}%
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Last Completed Lesson",
      dataIndex: "courses",
      key: "lastCompletedLesson",
      render: (courses: IStudentCourseProgress["courses"]) => (
        <div>
          <p className="font-medium">{courses?.lastCompletedLesson?.title}</p>
          <p className="text-xs text-gray-500">
            Module: {courses?.lastCompletedLesson?.module}
          </p>
        </div>
      ),
    },
  ];

  const expandedRowRender = (record: IStudentCourseProgress) => {
    const moduleColumns = [
      {
        title: "Module Title",
        dataIndex: "title",
        key: "title",
        render: (text: string) => <span className="font-medium">{text}</span>,
      },
      {
        title: "Status",
        dataIndex: "isModuleCompleted",
        key: "isModuleCompleted",
        render: (isCompleted: boolean) =>
          isCompleted ? (
            <Tag color="green">Completed</Tag>
          ) : (
            <Tag color="orange">In Progress</Tag>
          ),
      },
      {
        title: "Lessons",
        key: "lessons",
        render: (_: any, module: any) => (
          <Table
            dataSource={module?.lessons}
            columns={[
              {
                title: "Lesson Title",
                dataIndex: "lesson",
                key: "lesson",
                render: (lesson: any) => <span>{lesson?.title}</span>,
              },
              {
                title: "Completed",
                dataIndex: "isLessonCompleted",
                key: "isLessonCompleted",
                render: (isCompleted: boolean) =>
                  isCompleted ? (
                    <Tag color="green">Yes</Tag>
                  ) : (
                    <Tag color="red">No</Tag>
                  ),
              },
              {
                title: "Assignment Submitted",
                dataIndex: "isAssignmentSubmitted",
                key: "isAssignmentSubmitted",
                render: (submitted: boolean) =>
                  submitted ? (
                    <Tag color="green">Yes</Tag>
                  ) : (
                    <Tag color="red">No</Tag>
                  ),
              },
              {
                title: "Quiz Submitted",
                dataIndex: "isQuizSubmitted",
                key: "isQuizSubmitted",
                render: (submitted: boolean) =>
                  submitted ? (
                    <Tag color="green">Yes</Tag>
                  ) : (
                    <Tag color="red">No</Tag>
                  ),
              },
            ]}
            rowKey={(record: any) => record?.lesson?.id}
            pagination={false}
            className="mt-2"
          />
        ),
      },
    ];

    return (
      <Table
        dataSource={record?.courses?.modules}
        columns={moduleColumns}
        rowKey={(record) => record?.module?.id}
        pagination={false}
        className="mt-4"
      />
    );
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-6">Student Progress</h1>
      <Table
        dataSource={studentProgresses}
        columns={columns}
        expandable={{ expandedRowRender }}
        rowKey={(record) => record?.id}
        pagination={{ pageSize: 5 }}
        className="w-full"
        loading={isLoading}
      />
    </div>
  );
};

export default StudentsProgress;
