import { useGetAllSubmittedQuizzesQuery } from "@/features/quizSubmission";
import { IQuizSubmissionResult } from "@/types/quizSubmission.type";
import { IUser } from "@/types/user.type";
import { Button, Table, TableProps } from "antd/lib";
import { useState } from "react";

const SubmittedQuizzes = () => {
  const { data, isLoading } = useGetAllSubmittedQuizzesQuery({});
  const quizSubmissions = data?.data as IQuizSubmissionResult[];
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: IQuizSubmissionResult) => {
    setExpandedRows((prev) =>
      expanded ? [...prev, record?.id] : prev.filter((id) => id !== record?.id)
    );
  };

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
        <Button
          type="primary"
          onClick={() => handleExpand(!expandedRows.includes(quiz.id), quiz)}
        >
          {expandedRows.includes(quiz.id) ? "Hide Answers" : "Show Answers"}
        </Button>
      ),
    },
  ];

  const handleShowQuizAnswers = (quiz: IQuizSubmissionResult) => {
    return (
      <div className="p-2">
        {quiz?.modifiedQuizAnswers?.length > 0 ? (
          <div className="space-y-1">
            {quiz?.modifiedQuizAnswers?.map((answer, index) => (
              <div
                key={index}
                className={`p-2 border ${
                  answer?.isCorrect
                    ? "border-green-500 bg-green-400"
                    : "border-red-500 bg-red-400"
                } rounded-md`}
              >
                <p className="font-semibold">
                  Q{index + 1}: {answer?.question}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Your Answer:
                  </span>
                  <span>{answer?.givenAnswer}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Correct Answer:
                  </span>
                  <span> {answer?.correctAnswer}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No answers available.</p>
        )}
      </div>
    );
  };

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
          expandable={{
            expandedRowRender: handleShowQuizAnswers,
            expandedRowKeys: expandedRows,
            onExpand: handleExpand,
          }}
        />
      </div>
    </div>
  );
};

export default SubmittedQuizzes;
