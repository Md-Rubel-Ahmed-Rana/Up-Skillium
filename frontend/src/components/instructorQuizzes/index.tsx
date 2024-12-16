import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllQuizzesByInstructorQuery } from "@/features/lesson";
import { IGetQuizQuestion } from "@/types/quiz.type";
import { IUser } from "@/types/user.type";
import QuizTable from "../quizzes";

const InstructorQuizzes = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllQuizzesByInstructorQuery({
    instructorId: user?.id,
  });
  const quizzes = data?.data as IGetQuizQuestion[];

  return (
    <div className="mt-4 pb-20 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Quizzes</h2>
      <QuizTable isLoading={isLoading} quizzes={quizzes} />
    </div>
  );
};

export default InstructorQuizzes;
