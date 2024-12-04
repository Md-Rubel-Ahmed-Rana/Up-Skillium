import { useGetAllQuizzesQuery } from "@/features/quiz";
import { IGetQuizQuestion } from "@/types/quiz.type";
import { Table, TableProps } from "antd/lib";
import QuizDeleteModal from "./QuizDeleteModal";
import QuizUpdateModal from "./QuizUpdateModal";

const ManageQuizzes = () => {
  const { data, isLoading } = useGetAllQuizzesQuery({});
  const quizzes = data?.data as IGetQuizQuestion[];
  const columns: TableProps<IGetQuizQuestion>["columns"] = [
    {
      title: "Question",
      key: "question",
      dataIndex: "question",
    },
    {
      title: "Correct Answer",
      key: "correctAnswer",
      dataIndex: "correctAnswer",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (options: string[]) => (
        <ul className="list-disc pl-5 grid grid-cols-1 lg:grid-cols-2">
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Module",
      dataIndex: ["module", "title"],
      key: "title",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, quiz: IGetQuizQuestion) => (
        <div className="flex items-center gap-3">
          <QuizUpdateModal quiz={quiz} />
          <QuizDeleteModal quiz={quiz} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 pb-20 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Quizzes</h2>
      <Table
        columns={columns}
        dataSource={quizzes}
        bordered
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg w-full min-w-[900px]"
        loading={isLoading}
      />
    </div>
  );
};

export default ManageQuizzes;
