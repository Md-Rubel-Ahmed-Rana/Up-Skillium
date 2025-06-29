import { Badge, Button, Tooltip } from "antd/lib";
import { FaCartArrowDown } from "react-icons/fa";

type Props = {
  total: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CartToggleButton = ({ open, setOpen, total }: Props) => {
  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Tooltip title="Course cart">
      <Badge count={total} size="small" offset={[-2, 4]} showZero>
        <Button
          onClick={handleToggleDrawer}
          type="default"
          shape="circle"
          icon={<FaCartArrowDown />}
        />
      </Badge>
    </Tooltip>
  );
};

export default CartToggleButton;
