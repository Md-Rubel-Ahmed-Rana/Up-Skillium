import { useGetLoggedInUserQuery } from "@/features/auth";
import { useAddToCartMutation, useGetUserCartsQuery } from "@/features/cart";
import { useGetAllMyCoursesQuery } from "@/features/myCourse";
import { ICart } from "@/types/cart.type";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import { Button, Spin } from "antd/lib";
import toast from "react-hot-toast";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";

type Props = {
  courseId: string;
  buttonSize?: "small" | "large" | "middle";
  buttonWidth?: string;
};

const AddToCartButton = ({
  courseId,
  buttonSize = "large",
  buttonWidth = "w-full",
}: Props) => {
  const { data: userData, isLoading: isUserLoading } = useGetLoggedInUserQuery(
    {}
  );
  const user = userData?.data as IUser;
  const [addItem, { isLoading: isAddingToCart }] = useAddToCartMutation();
  const { data: cartItemData, isLoading: isCoursesLoading } =
    useGetUserCartsQuery({
      userId: user?.id || user?._id,
    });
  const { data: coursesData, isLoading: isMyCourseLoading } =
    useGetAllMyCoursesQuery({
      userId: user?.id,
    });

  const myCoursesData = (coursesData?.data as IMyCourse[]) || [];
  const myCoursesIds = myCoursesData?.map((course) => course?.course?.id);
  const isAlreadyEnrolled = myCoursesIds?.includes(courseId);

  const courses = cartItemData?.data?.map((item: ICart) => item?.course);
  const isAlreadyAdded = courses?.some((crs: any) => crs?._id === courseId);
  const isStudent = user?.role?.name === "student";
  const isLoading =
    isUserLoading || isCoursesLoading || isAddingToCart || isMyCourseLoading;

  const handleAddToCart = async () => {
    try {
      const res = await addItem({
        course: courseId,
        user: user?.id || user?._id,
      });
      if (res?.data?.statusCode === 201) {
        toast.success(
          res?.data?.message || "Course added to cart successfully"
        );
      } else {
        toast.error("Failed to add cart");
      }
    } catch {
      toast.error("Failed to add cart");
    }
  };

  const renderButtonContent = () => {
    if (isLoading) return <Spin size="small" />;
    if (!isStudent) return "Login as student";
    if (isAlreadyEnrolled)
      return (
        <div className="flex items-center justify-center gap-2">
          <FaCheckCircle className="text-lg text-green-600" />
          Already enrolled
        </div>
      );
    if (isAlreadyAdded)
      return (
        <div className="flex items-center justify-center gap-2">
          <FaCheckCircle className="text-lg text-green-600" />
          Already in Cart
        </div>
      );
    return (
      <div className="flex items-center justify-center gap-2">
        <FaCartPlus className="text-lg" />
        <span>Add to Cart</span>
      </div>
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!isStudent || isAlreadyAdded || isLoading || isAlreadyEnrolled}
      className={`${buttonWidth} ${
        !isStudent || isAlreadyAdded || isLoading || isAlreadyEnrolled
          ? ""
          : "bg-yellow-500 hover:bg-yellow-600"
      }  text-black font-semibold transition-colors duration-300`}
      size={buttonSize}
    >
      {renderButtonContent()}
    </Button>
  );
};

export default AddToCartButton;
