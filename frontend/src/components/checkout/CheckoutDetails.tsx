import CheckoutButton from "./CheckoutButton";
import { useState } from "react";
import { Divider } from "antd/lib";
import { ICourse } from "@/types/course.type";
import PaymentMethods from "./PaymentMethods";
import PriceDetails from "./PriceDetails";

type Props = {
  course: ICourse;
};

const CheckoutDetails = ({ course }: Props) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <>
      <PriceDetails
        price={{
          original: course?.price?.original,
          discount: course?.price?.discount,
          salePrice: course?.price?.salePrice,
        }}
      />
      <Divider />
      <PaymentMethods
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <CheckoutButton
        paymentMethod={paymentMethod}
        courseId={course?.id}
        courseName={course?.title}
        price={course?.price?.salePrice}
      />
    </>
  );
};

export default CheckoutDetails;
