import { useGetAllSubmittedQuizzesQuery } from "@/features/quizSubmission";
import { IQuizSubmissionResult } from "@/types/quizSubmission.type";
import { IUser } from "@/types/user.type";
import { Button, Table, TableProps } from "antd/lib";

const SubmittedQuizzes = () => {
  const { data, isLoading } = useGetAllSubmittedQuizzesQuery({});
  const quizSubmissions = data?.data as IQuizSubmissionResult[];
  const columns: TableProps<IQuizSubmissionResult>["columns"] = [
    {
      title: "Student",
      dataIndex: "user",
      key: "user",
      render: (user: IUser) => (
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full ring-1"
            src={user?.image}
            alt={user?.name}
          />
          <h4>{user?.name}</h4>
        </div>
      ),
    },
    {
      title: "Lesson",
      dataIndex: ["lesson", "title"],
      key: "title",
    },
    {
      title: "Total Quiz",
      dataIndex: "totalQuiz",
      key: "totalQuiz",
    },
    {
      title: "Correct Answers",
      dataIndex: "correctAnswers",
      key: "correctAnswers",
    },
    {
      title: "Wrong Answers",
      dataIndex: "wrongAnswers",
      key: "wrongAnswers",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, quiz: IQuizSubmissionResult) => (
        <div className="flex items-center gap-2">
          <Button type="primary">Show Answers</Button>
        </div>
      ),
    },
  ];
  return (
    <div className="mt-4">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Quiz Submissions
      </h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={quizSubmissions}
          rowKey={(quiz) => quiz?.id}
          loading={isLoading}
          bordered
          className="shadow-md rounded-lg w-full min-w-[900px]"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default SubmittedQuizzes;
