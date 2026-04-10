import { IDocument } from "@/types/common";
import MarqueeContainer from "./MarqueeContainer";
import MarqueeHeader from "./MarqueeHeader";

type Props = {
  documents: IDocument[];
};

const Marquee = ({ documents = [] }: Props) => {
  return (
    <div className="w-full py-20 relative px-2 lg:px-5">
      <MarqueeHeader />
      <MarqueeContainer documents={documents} />
    </div>
  );
};

export default Marquee;
