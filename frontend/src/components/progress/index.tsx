import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetStudentMyCoursesQuery } from "@/features/studentProgress";
import StudentCourseProgressSkeleton from "@/skeletons/courseProgress/StudentCourseProgressSkeleton";
import { ICourseProgress } from "@/types/studentProgress.type";
import { IUser } from "@/types/user.type";
import { Progress, Tooltip } from "antd/lib";

const StudentCourseProgress = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetStudentMyCoursesQuery({ userId: user?.id });
  const progresses = (data?.data as ICourseProgress[]) || [];

  return (
    <>
      {isLoading ? (
        <StudentCourseProgressSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-3">
          {progresses?.map((progress) => (
            <div
              key={progress?.course?.id}
              className="bg-white shadow-md transition hover:scale-105 rounded-lg p-5 hover:shadow-lg  duration-300"
            >
              <Tooltip
                title={
                  <div>
                    <h3 className="font-semibold">{progress?.course?.title}</h3>
                    <p className="text-sm text-gray-500">
                      Completion: {progress?.completionPercentage}%
                    </p>
                  </div>
                }
              >
                <div className="flex justify-center mb-4">
                  <Progress
                    percent={progress?.completionPercentage}
                    type="circle"
                    size={80}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </div>
              </Tooltip>
              <h2 className="text-lg font-bold text-center text-gray-700">
                {progress?.course?.title}
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentCourseProgress;
