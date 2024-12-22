import { useGetAllLiveClassesQuery } from "@/features/liveClass";
import { IGetLiveClass } from "@/types/liveClass.type";
import LiveClassTable from "../liveClasses";

const AllLiveClasses = () => {
  const { data, isLoading } = useGetAllLiveClassesQuery({});
  const liveClasses = data?.data as IGetLiveClass[];
  return (
    <div className="mt-3 p-2">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage live classes
      </h2>
      <LiveClassTable classes={liveClasses} isLoading={isLoading} />
    </div>
  );
};

export default AllLiveClasses;
