import { ICart } from "@/types/cart.type";
import { Drawer } from "antd/lib";

type Props = {
  open: boolean;
  isLoading: boolean;
  setOpen: (value: boolean) => void;
  items: ICart[];
};

const CartDrawer = ({ open, setOpen, isLoading, items }: Props) => {
  return (
    <Drawer
      title="Courses"
      closable={{ "aria-label": "Close Button" }}
      onClose={() => setOpen(false)}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default CartDrawer;
