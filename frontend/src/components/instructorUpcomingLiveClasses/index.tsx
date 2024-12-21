import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetUpcomingLiveClassesByInstructorQuery } from "@/features/liveClass";
import { IGetLiveClass } from "@/types/liveClass.type";
import { IUser } from "@/types/user.type";
import LiveClassTable from "../liveClasses";

const InstructorUpcomingLiveClasses = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetUpcomingLiveClassesByInstructorQuery({
    instructorId: user?.id,
  });
  const liveClasses = data?.data as IGetLiveClass[];

  return (
    <div className="mt-3 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Upcoming Live Classes
      </h2>
      <LiveClassTable classes={liveClasses} isLoading={isLoading} />
    </div>
  );
};

export default InstructorUpcomingLiveClasses;
