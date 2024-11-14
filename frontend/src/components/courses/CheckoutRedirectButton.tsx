/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  course: any;
  buttonText: string;
  styles: string;
  buttonSize: "large" | "small" | "middle";
};

const CheckoutRedirectButton = ({
  course,
  buttonText,
  styles,
  buttonSize,
}: Props) => {
  return (
    <Link
      href={`/checkout/${course?.id}?courseId=${course?.id}&courseName=${
        course?.title
      }&category=${course?.category}&description=${
        course?.description
      }&tags=${course?.tags?.toString()}`}
      key={"1"}
    >
      <Button size={buttonSize} type="primary" className={styles} key={"2"}>
        {buttonText}
      </Button>
    </Link>
  );
};

export default CheckoutRedirectButton;
