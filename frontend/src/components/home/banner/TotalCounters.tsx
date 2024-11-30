import totalCountersData from "@/constants/totalCounters";
import CountUp from "react-countup";

const TotalCounters = () => {
  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {totalCountersData.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border-t-4 border-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl font-bold text-purple-600">
              <CountUp end={item.totalCount} duration={3} />
            </div>
            <h3 className="text-lg font-semibold mt-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCounters;
