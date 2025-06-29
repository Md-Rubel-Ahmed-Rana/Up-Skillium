import { Button } from "antd/lib";
import Link from "next/link";

const NavigatorButton = () => {
  return (
    <div className="text-center">
      <h2 className="text-lg lg:text-3xl font-bold mb-2">
        Ready to Start Your Journey?
      </h2>
      <Link
        href="/courses"
        className="inline-block font-semibold mt-2 transition-all duration-300"
      >
        <Button type="primary">Get Started Now</Button>
      </Link>
    </div>
  );
};

export default NavigatorButton;
