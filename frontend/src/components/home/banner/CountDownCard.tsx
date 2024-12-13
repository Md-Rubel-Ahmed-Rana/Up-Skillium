import CountUp from "react-countup";

type Item = {
  id: string;
  title: string;
  totalCount: number;
  description: string;
};

type Props = {
  item: Item;
};

const CountDownCard = ({ item }: Props) => {
  return (
    <div
      data-aos="zoom-in-up"
      key={item?.id}
      className={`relative bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl`}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
      <div className="text-5xl font-bold text-white">
        <CountUp end={item?.totalCount} duration={3} />
      </div>
      <h3 className="text-lg font-semibold mt-3 text-white">{item?.title}</h3>
      <p className="text-sm text-white/80 mt-2">{item?.description}</p>
    </div>
  );
};

export default CountDownCard;
