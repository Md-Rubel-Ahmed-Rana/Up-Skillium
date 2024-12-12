import opportunitiesData from "@/constants/opportunities";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import OpportunityCard from "./OpportunityCard";

const OpportunitiesContainer = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div className="-mt-20" ref={container}>
      {opportunitiesData.map((item, index) => {
        const targetScale = 1 - (opportunitiesData.length - index) * 0.05;
        return (
          <OpportunityCard
            key={item?.id}
            index={index}
            {...item}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default OpportunitiesContainer;
