/* eslint-disable @next/next/no-img-element */
import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Radio, RadioChangeEvent, Typography, Divider, Tag } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaStripeS, FaPaypal } from "react-icons/fa";
import CheckoutButton from "./CheckoutButton";

const { Title, Text } = Typography;

const Checkout = () => {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const handleSelectPaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex gap-5 w-2/3 justify-center p-6 shadow-md border rounded-md bg-slate-100">
        <div className="border p-5 rounded-md w-1/2">
          <div className="mb-6">
            <Title level={3}>{course?.title}</Title>
            <img
              src={course?.image}
              alt={course?.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-gray-600 font-semibold text-lg block">
              {course?.category}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {course?.technologies?.map((tech) => (
                <Tag color="geekblue" key={tech}>
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-md w-1/2">
          <div className="mb-4">
            <Title level={4}>Price Details</Title>
            <div className="flex justify-between">
              <Text className="text-gray-600">Original Price:</Text>
              <Text delete className="text-gray-500">
                ${course?.price?.original.toFixed(2)}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text className="text-gray-600">Discount:</Text>
              <Text className="text-red-500">
                -${course?.price?.discount.toFixed(2)}
              </Text>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <Text>Total:</Text>
              <Text>${course?.price?.salePrice?.toFixed(2)}</Text>
            </div>
          </div>

          <Divider />

          <div className="mb-6 w-full">
            <Title level={4}>Choose Payment Method</Title>
            <Radio.Group
              onChange={handleSelectPaymentMethod}
              value={paymentMethod}
              className="w-full flex gap-2"
            >
              <Radio
                value="stripe"
                className="border-2 px-4 py-2 rounded-md w-full"
              >
                <div className="flex items-center gap-2 w-full">
                  <FaStripeS size={24} color="#6772e5" />
                  <Text>Stripe</Text>
                </div>
              </Radio>
              <Radio
                value="paypal"
                className="border-2 px-4  py-2 rounded-md w-full"
              >
                <div className="flex items-center gap-2 w-full">
                  <FaPaypal size={24} color="#003087" />
                  <Text>PayPal</Text>
                </div>
              </Radio>
            </Radio.Group>
            {paymentMethod === "paypal" && (
              <p className="text-red-500">
                PayPal is temporarily unavailable. We apologize for any
                inconvenience and are working to restore this payment option
                soon.
              </p>
            )}
          </div>
          <CheckoutButton
            paymentMethod={paymentMethod}
            courseId={course?.id}
            courseName={course?.title}
            price={course?.price?.salePrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
