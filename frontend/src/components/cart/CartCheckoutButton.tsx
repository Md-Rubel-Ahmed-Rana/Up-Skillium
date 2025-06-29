import { useGetLoggedInUserQuery } from "@/features/auth";
import { useCheckoutCartMutation } from "@/features/cart";
import { IUser } from "@/types/user.type";
import { Button, Spin } from "antd/lib";
import toast from "react-hot-toast";

const CartCheckoutButton = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data.data as IUser;
  const [checkout, { isLoading }] = useCheckoutCartMutation();

  const handleCheckout = async () => {
    const result: any = await checkout({ userId: user?.id || user?._id });
    if (result?.data?.statusCode === 200) {
      window.location.href = result?.data?.data?.url;
      toast.success(result?.data?.message || "Checkout successful");
    } else {
      toast.error(
        result?.error?.data?.message ||
          result?.data?.error?.message ||
          "Failed to checkout. Please try again"
      );
    }
  };

  return (
    <Button
      loading={isLoading}
      icon={<Spin size="small" />}
      onClick={handleCheckout}
      disabled={isLoading}
      type="primary"
      block
    >
      {isLoading ? "Processing..." : "Proceed to Checkout"}
    </Button>
  );
};

export default CartCheckoutButton;
