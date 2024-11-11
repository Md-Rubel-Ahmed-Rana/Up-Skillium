import { Skeleton } from "antd/lib";

const CheckoutSkeleton = () => {
  return (
    <div className="lg:flex lg:h-screen lg:w-2/3 w-full mx-auto justify-center items-center mb-20 lg:-mt-10">
      <Skeleton />
    </div>
  );
};

export default CheckoutSkeleton;
