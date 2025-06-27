import CheckoutRedirectButton from "@/components/courses/courseListing/CheckoutRedirectButton";
import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Card } from "antd/lib";
import { useRouter } from "next/router";

const { Meta } = Card;

const CourseCardForDetails = () => {
  const { query } = useRouter();
  const courseId = query?.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;
  return (
    <Card
      cover={<img alt="course thumbnail" src={course?.image} />}
      actions={[
        <div
          key="price-section"
          className="w-11/12 flex flex-col justify-center mx-auto items-center space-y-2"
        >
          <div className="bg-gray-50 p-4 rounded-xl w-full max-w-md shadow-sm">
            <div className="flex items-end gap-4">
              <div className="text-gray-400 text-lg line-through">
                ${course?.price?.original || 99}
              </div>
              <div className="text-blue-600 text-3xl font-bold">
                ${course?.price?.salePrice || 44}
              </div>
              {course?.price?.discount && (
                <div className="text-sm text-red-500 font-medium bg-red-100 px-2 py-0.5 rounded">
                  -{course.price.discount}%
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <CheckoutRedirectButton
              course={course}
              buttonText="Purchase Now"
              key={"1"}
              buttonSize="large"
              styles="w-full"
            />
          </div>
        </div>,
      ]}
    >
      <Meta className="pb-3" title={course?.title} />
    </Card>
  );
};

export default CourseCardForDetails;
