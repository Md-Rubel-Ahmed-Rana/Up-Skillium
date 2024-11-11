/* eslint-disable @next/next/no-img-element */
import { useGetSingleCourseQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { useRouter } from "next/router";
import BasicCourseInfo from "./BasicCourseInfo";
import CheckoutDetails from "./CheckoutDetails";

const Checkout = () => {
  const { query } = useRouter();
  const courseId = query.courseId as string;
  const { data } = useGetSingleCourseQuery({ id: courseId });
  const course = data?.data as ICourse;

  if (!course)
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-center">Data Loading...</h2>
      </div>
    );

  return (
    <div className="lg:flex lg:h-screen justify-center items-center mb-20 lg:-mt-10">
      <div className="flex gap-5 lg:w-2/3 w-full flex-col lg:flex-row justify-center lg:p-6 p-2 shadow-md border rounded-md bg-slate-100">
        <div className="border lg:p-5 p-2 rounded-md lg:w-1/2 w-full">
          <BasicCourseInfo
            title={course?.title}
            category={course?.category}
            image={course?.image}
            technologies={course?.technologies || []}
          />
        </div>
        <div className="border lg:p-5 p-2 rounded-md lg:w-1/2 w-full">
          <CheckoutDetails course={course} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
