import { ICart } from "@/types/cart.type";
import { Drawer, Empty, Spin } from "antd/lib";
import CartItem from "./CartItem";
import PricesCalculate from "./PricesCalculate";

type Props = {
  open: boolean;
  isLoading: boolean;
  setOpen: (value: boolean) => void;
  items: ICart[];
};

const CartDrawer = ({ open, setOpen, isLoading, items }: Props) => {
  return (
    <Drawer
      title="Your Course Cart"
      onClose={() => setOpen(false)}
      open={open}
      width={400}
      footer={items.length > 0 && <PricesCalculate items={items} />}
    >
      {isLoading ? (
        <Spin />
      ) : items.length === 0 ? (
        <Empty description="No courses in your cart" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((item) => (
            <CartItem item={item} key={item?.id || item?.course?.id} />
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
