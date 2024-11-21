import { IGetQuizQuestion } from "@/types/quiz.type";
import { Table, TableProps } from "antd/lib";
import QuizDeleteModal from "./QuizDeleteModal";
import QuizUpdateModal from "./QuizUpdateModal";

const ManageQuizzes = () => {
  const lessons: IGetQuizQuestion[] = Array.from({ length: 100 }).map(
    (_, index) => ({
      id: (index + 1).toString(),
      question: `Question ${index + 1}`,
      correctAnswer: `Correct answer ${index + 1}`,
      options: ["option 1", "option 2", "option 3", "option 4"],
      module: {
        id: (index + 1).toString(),
        title: `Module ${index + 1}`,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  );

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
        dataSource={lessons}
        bordered
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default ManageQuizzes;
