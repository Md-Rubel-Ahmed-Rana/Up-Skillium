import { useGetAllLiveClassesQuery } from "@/features/liveClass";
import { IGetLiveClass } from "@/types/liveClass.type";
import LiveClassTable from "../liveClasses";

const UpcomingClasses = () => {
  const { data, isLoading } = useGetAllLiveClassesQuery({ status: "upcoming" });
  const liveClasses = data?.data as IGetLiveClass[];
  return (
    <div className="mt-3 lg:px-0 px-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Upcoming live classes
      </h2>
      <LiveClassTable classes={liveClasses} isLoading={isLoading} />
    </div>
  );
};

export default UpcomingClasses;
