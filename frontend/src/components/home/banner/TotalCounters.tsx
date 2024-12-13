import totalCountersData from "@/constants/totalCounters";
import CountDownCard from "./CountDownCard";

const TotalCounters = () => {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {totalCountersData.map((item) => (
          <CountDownCard item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default TotalCounters;
