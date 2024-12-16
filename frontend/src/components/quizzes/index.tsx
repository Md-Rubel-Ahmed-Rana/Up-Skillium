import { IGetQuizQuestion } from "@/types/quiz.type";
import { Table, TableProps } from "antd/lib";
import QuizDeleteModal from "./QuizDeleteModal";
import QuizUpdateModal from "./QuizUpdateModal";

type Props = {
  quizzes: IGetQuizQuestion[];
  isLoading: boolean;
};

const QuizTable = ({ quizzes, isLoading }: Props) => {
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
    <Table
      columns={columns}
      dataSource={quizzes}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      loading={isLoading}
    />
  );
};

export default QuizTable;
