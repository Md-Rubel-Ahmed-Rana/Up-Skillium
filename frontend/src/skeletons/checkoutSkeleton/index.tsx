import CourseInfoSkeleton from "./CourseInfoSkeleton";
import PriceDetailSkeleton from "./PriceDetailSkeleton";

const CheckoutSkeleton = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full lg:w-2/3 mx-auto flex flex-col lg:flex-row lg:justify-between bg-slate-100 shadow-md rounded-md p-5 ">
        <CourseInfoSkeleton />
        <div className="w-4 h-4 border-2" />
        <PriceDetailSkeleton />
      </div>
    </section>
  );
};

export default CheckoutSkeleton;
