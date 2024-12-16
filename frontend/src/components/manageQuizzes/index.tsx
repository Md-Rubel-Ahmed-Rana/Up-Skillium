import { useGetAllQuizzesQuery } from "@/features/quiz";
import { IGetQuizQuestion } from "@/types/quiz.type";
import QuizTable from "../quizzes";

const ManageQuizzes = () => {
  const { data, isLoading } = useGetAllQuizzesQuery({});
  const quizzes = data?.data as IGetQuizQuestion[];

  return (
    <div className="mt-4 pb-20 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Manage Quizzes</h2>
      <QuizTable isLoading={isLoading} quizzes={quizzes} />
    </div>
  );
};

export default ManageQuizzes;
