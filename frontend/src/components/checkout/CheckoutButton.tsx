/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useMakeStripeCheckoutMutation } from "@/features/stripePayment";
import { ICheckout } from "@/types/checkout.type";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {
  paymentMethod: string;
  courseId: string;
  courseName: string;
  price: number;
};

const CheckoutButton = ({
  paymentMethod,
  courseId,
  courseName,
  price,
}: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const router = useRouter();
  const [checkout, { isLoading }] = useMakeStripeCheckoutMutation();

  const handleCheckout = async () => {
    if (!user?.id) {
      router.push("/login");
      return;
    } else {
      const checkoutData: ICheckout[] = [
        {
          courseId,
          courseName,
          price: Math.ceil(price),
          quantity: 1,
          userId: user?.id,
        },
      ];
      const result: any = await checkout(checkoutData);
      if (result?.data?.statusCode === 201) {
        window.location.href = result?.data?.data?.url;
        toast.success(result?.data?.message || "Payment created successfully.");
      } else {
        toast.error(
          result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to checkout. Please try again"
        );
      }
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={paymentMethod === "paypal" || isLoading}
      type="primary"
      block
      size="large"
      loading={isLoading}
      iconPosition="end"
    >
      {isLoading ? "Processing..." : "Checkout"}
    </Button>
  );
};

export default CheckoutButton;
