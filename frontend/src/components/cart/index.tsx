import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetUserCartsQuery } from "@/features/cart";
import { ICart } from "@/types/cart.type";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import CartToggleButton from "./CartToggleButton";

const CourseCart = () => {
  const [open, setOpen] = useState(false);
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetUserCartsQuery({
    userId: user?.id || user?._id,
  });
  const courses = (data?.data || []) as ICart[];

  return (
    <>
      <CartToggleButton
        open={open}
        setOpen={setOpen}
        total={courses?.length || 0}
      />
      <CartDrawer
        open={open}
        setOpen={setOpen}
        isLoading={isLoading}
        items={courses}
      />
    </>
  );
};

export default CourseCart;
