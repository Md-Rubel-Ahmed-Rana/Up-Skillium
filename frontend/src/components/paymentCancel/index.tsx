import { Result, Button } from "antd/lib";
import Link from "next/link";

const PaymentCancelled = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Result
        status="warning"
        title="Payment Incomplete"
        subTitle="It looks like you were just a step away from joining your course! Don't worry, you can still complete your payment and continue learning."
        extra={
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600 text-lg">
              {`"Learning is a journey. Don't miss out on the opportunity to
              enhance your skills and reach your goals!"`}
            </p>
            <Link href={"/dashboard/order-history"}>
              <Button type="primary" shape="round" size="large">
                Complete Payment
              </Button>
            </Link>
            <Link href={"/courses"}>
              <Button type="link">Explore Other Courses</Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default PaymentCancelled;
