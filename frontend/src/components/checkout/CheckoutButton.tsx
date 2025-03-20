import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllMyCoursesQuery } from "@/features/myCourse";
import { useMakeStripeCheckoutMutation } from "@/features/stripePayment";
import { ICheckout } from "@/types/checkout.type";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import handleValidationErrors from "@/utils/handleValidationErrors";
import { Button } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  const { data: coursesData } = useGetAllMyCoursesQuery({
    userId: user?.id,
  });
  const courses = (coursesData?.data as IMyCourse[]) || [];

  const course = courses.find((course) => course?.course?.id === courseId);

  const isAlreadyEnrolled = course?.course?.id ? true : (false as boolean);

  const handleCheckout = async () => {
    if (!user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Unauthenticated",
        position: "center",
        text: "You are not a logged in user. Please login first then try to checkout!",
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: "Got it",
        confirmButtonColor: "#d33",
        backdrop: true,
        timer: 10000,
      });
      router.push("/login");
      return;
    } else {
      if (user?.role?.name === "student") {
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
          toast.success(
            result?.data?.message || "Payment created successfully."
          );
        } else {
          handleValidationErrors(result);
          toast.error(
            result?.error?.data?.message ||
              result?.data?.error?.message ||
              "Failed to checkout. Please try again"
          );
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "<strong>Ineligible to purchase course!</strong>",
          position: "center",
          text: "You are not a student. Only student can purchase a course.We are truly appreciate your time & patient. To purchase a course create another account for student. Thank you!",
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: "Got it",
          confirmButtonColor: "#d33",
          backdrop: true,
          timer: 10000,
        });
      }
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={paymentMethod === "paypal" || isLoading || isAlreadyEnrolled}
      type="primary"
      block
      size="large"
      loading={isLoading}
      iconPosition="end"
    >
      {isLoading
        ? "Processing..."
        : isAlreadyEnrolled
        ? "Already enrolled"
        : "Checkout"}
    </Button>
  );
};

export default CheckoutButton;
