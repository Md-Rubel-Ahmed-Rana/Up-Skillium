import { Button, Tooltip } from "antd/lib";
import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import CartDrawer from "./CartDrawer";

const CourseCart = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title="Course cart">
        <Button
          onClick={handleToggleDrawer}
          type="default"
          shape="circle"
          icon={<FaCartArrowDown />}
        />
      </Tooltip>
      <CartDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default CourseCart;
