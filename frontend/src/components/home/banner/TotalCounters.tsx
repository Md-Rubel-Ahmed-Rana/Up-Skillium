import totalCountersData from "@/constants/totalCounters";
import CountUp from "react-countup";

const TotalCounters = () => {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {totalCountersData.map((item) => (
          <div
            key={item.id}
            className={`relative bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl animate__animated ${item?.animate}`}
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
            <div className="text-5xl font-bold text-white">
              <CountUp end={item.totalCount} duration={3} />
            </div>
            <h3 className="text-lg font-semibold mt-3 text-white animate__animated animate__fadeInDown">
              {item.title}
            </h3>
            <p className="text-sm text-white/80 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCounters;
