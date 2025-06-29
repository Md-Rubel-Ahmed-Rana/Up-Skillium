import { useRemoveCartItemMutation } from "@/features/cart";
import { Button } from "antd/lib";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  cartId: string;
};

const RemoveCartItem = ({ cartId }: Props) => {
  const [remove, { isLoading }] = useRemoveCartItemMutation();

  const handleRemoveCartItem = async () => {
    try {
      const res = await remove({ id: cartId });
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message || "Course remove from cart");
      } else {
        toast.error("Failed to remove item");
      }
    } catch {
      toast.error("Failed to remove item");
    }
  };

  return (
    <Button
      onClick={handleRemoveCartItem}
      type="text"
      disabled={isLoading}
      loading={isLoading}
      icon={<FaTrashAlt color="red" />}
    />
  );
};

export default RemoveCartItem;
