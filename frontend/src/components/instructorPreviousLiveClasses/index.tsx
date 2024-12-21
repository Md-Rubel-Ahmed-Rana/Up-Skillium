import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCompletedLiveClassesByInstructorQuery } from "@/features/liveClass";
import { IGetLiveClass } from "@/types/liveClass.type";
import { IUser } from "@/types/user.type";
import LiveClassTable from "../liveClasses";

const InstructorPreviousLiveClasses = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetCompletedLiveClassesByInstructorQuery({
    instructorId: user?.id,
  });
  const liveClasses = data?.data as IGetLiveClass[];

  return (
    <div className="mt-3 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Previous Live Classes
      </h2>
      <LiveClassTable classes={liveClasses} isLoading={isLoading} />
    </div>
  );
};

export default InstructorPreviousLiveClasses;
