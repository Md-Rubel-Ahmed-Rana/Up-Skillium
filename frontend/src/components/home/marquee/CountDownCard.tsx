import { IDocument } from "@/types/common";
import CountUp from "react-countup";

type Props = {
  item: IDocument;
  index: number;
};

const CountDownCard = ({ item, index }: Props) => {
  return (
    <div
      key={`${item?.id}-${index}`}
      data-id={item?.id}
      className="count-card relative shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl min-w-[240px]"
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
      <div className="text-5xl font-bold">
        <CountUp end={item?.documents || 20} duration={2} />
      </div>
      <h3 className="text-xl font-semibold mt-3">{item?.name}</h3>
      <p className="text-sm mt-2">{item?.description}</p>
    </div>
  );
};

export default CountDownCard;
