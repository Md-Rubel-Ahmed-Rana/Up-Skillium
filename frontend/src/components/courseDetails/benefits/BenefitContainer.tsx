import benefitsData from "@/constants/benefits";
import BenefitCard from "./BenefitCard";

const BenefitContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
      {benefitsData.map((benefit, index) => (
        <BenefitCard key={benefit?.id} benefit={benefit} index={index} />
      ))}
    </div>
  );
};

export default BenefitContainer;
