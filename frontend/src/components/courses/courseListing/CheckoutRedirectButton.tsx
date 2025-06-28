import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllMyCoursesQuery } from "@/features/myCourse";
import { IMyCourse } from "@/types/myCourse.type";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  course: any;
  buttonText: string;
  styles: string;
  buttonSize: "large" | "small" | "middle";
};

const CheckoutRedirectButton = ({
  course,
  buttonText,
  styles,
  buttonSize,
}: Props) => {
  const { data, isLoading: isUserLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const { data: myCourseData, isLoading: isCoursesLoading } =
    useGetAllMyCoursesQuery(
      {
        userId: user?.id || user?._id,
      },
      {
        skip: !user, // only fetch courses when user is ready
      }
    );

  const myCourses = myCourseData?.data as IMyCourse[];
  const courses = myCourses?.map((myCourse) => myCourse?.course) || [];

  const isStudent = user?.role?.name === "student";
  const isAlreadyEnrolled = courses?.find(
    (crs: any) => crs._id === course?.id || crs._id === course?._id
  );

  const isLoading = isUserLoading || isCoursesLoading;
  const shouldAllowCheckout = !user || (isStudent && !isAlreadyEnrolled);

  return (
    <>
      {shouldAllowCheckout ? (
        <Link
          href={`/checkout/${course?.id}?courseId=${course?.id}&courseName=${
            course?.title
          }&category=${course?.category}&description=${
            course?.description
          }&tags=${course?.tags?.toString()}`}
          key="1"
        >
          <Button
            loading={isLoading}
            size={buttonSize}
            type="primary"
            disabled={isLoading}
            className={styles}
            key="2"
            iconPosition="start"
          >
            {isLoading ? "Loading..." :buttonText}
          </Button>
        </Link>
      ) : (
        <Button
          loading={isLoading}
          disabled
          size={buttonSize}
          type="primary"
          className={styles}
          key="2"
          iconPosition="start"
        >
          {isStudent ? "Already enrolled" : "Not a student"}
        </Button>
      )}
    </>
  );
};

export default CheckoutRedirectButton;
