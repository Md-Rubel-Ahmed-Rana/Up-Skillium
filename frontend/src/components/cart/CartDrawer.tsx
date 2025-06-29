import { Drawer } from "antd/lib";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CartDrawer = ({ open, setOpen }: Props) => {
  return (
    <Drawer
      title="Basic Drawer"
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
