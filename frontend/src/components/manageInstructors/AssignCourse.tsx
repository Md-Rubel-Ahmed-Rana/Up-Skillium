import {
  useGetAllCoursesQuery,
  useReAssignInstructorMutation,
} from "@/features/course";
import { ICourse } from "@/types/course.type";
import { IInstructor } from "@/types/instructor.type";
import { Avatar, Button, Modal, Select } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  instructor: IInstructor;
};

const AssignCourse = ({ instructor }: Props) => {
  const [isAssign, setIsAssign] = useState(false);
  const [isCurrentInstructor, setIsCurrentInstructor] = useState(false);
  const { data, isLoading } = useGetAllCoursesQuery({});
  const courses = data?.data as ICourse[];
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [assignCourse, { isLoading: isAssigning }] =
    useReAssignInstructorMutation();

  const handleSelectCourse = (courseId: string) => {
    const course = courses?.find((course) => course?.id === courseId);
    setSelectedCourse(course as ICourse);
    if (
      course &&
      course?.instructor &&
      course?.instructor?.id === instructor?.user?.id
    ) {
      setIsCurrentInstructor(true);
    } else {
      setIsCurrentInstructor(false);
    }
  };

  const handleAssignInstructor = async () => {
    try {
      const result: any = await assignCourse({
        courseId: selectedCourse?.id as string,
        instructorId: instructor?.user?.id as string,
      });

      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Instructor assigned successfully!"
        );
        setIsAssign(false);
      } else {
        toast.error(
          result?.data?.error?.message ||
            result?.error?.data?.message ||
            result?.error?.message ||
            "Failed to re-assign instructor"
        );
      }
    } catch (error: any) {
      toast.error(`Failed to re-assign instructor. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsAssign(true)}
        type="default"
        className="bg-purple-500 text-white hover:bg-purple-600 w-full"
      >
        Assign Courses
      </Button>
      <Modal
        title="Assign course"
        open={isAssign}
        loading={isLoading}
        onOk={handleAssignInstructor}
        okText={
          isAssigning
            ? "Assigning..."
            : isCurrentInstructor
            ? "This instructor already in this course"
            : "Assign"
        }
        onCancel={() => setIsAssign(false)}
        okButtonProps={{
          disabled: isAssigning || isCurrentInstructor,
          loading: isAssigning,
          iconPosition: "end",
        }}
        cancelButtonProps={{
          disabled: isAssigning,
        }}
        maskClosable={!isAssigning}
      >
        <div>
          <Select
            onChange={handleSelectCourse}
            allowClear
            className="w-full"
            placeholder="Select instructor"
          >
            {courses?.map((course) => (
              <Select.Option key={course?.id} value={course?.id}>
                {course?.title}
              </Select.Option>
            ))}
          </Select>
          {selectedCourse && (
            <div className="flex items-center gap-2 mt-4 border p-2 rounded-md">
              {selectedCourse?.image ? (
                <img
                  className="h-10 w-10 rounded-full ring-1"
                  src={selectedCourse?.image}
                  alt={selectedCourse?.title}
                />
              ) : (
                <Avatar className="h-10 w-10 rounded-full bg-blue-600 ring-1">
                  {selectedCourse?.title?.slice(0, 1)?.toUpperCase()}
                </Avatar>
              )}

              <div>
                <h3 className="text-lg font-semibold">
                  {selectedCourse?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedCourse?.category}
                </p>
              </div>
            </div>
          )}

          {selectedCourse?.instructor && selectedCourse?.instructor?.id && (
            <div className="flex items-center gap-2 mt-4 border-2 border-red-500 p-2 rounded-md">
              {selectedCourse?.instructor?.image ? (
                <img
                  className="h-10 w-10 rounded-full ring-1"
                  src={selectedCourse?.instructor?.image}
                  alt={selectedCourse?.instructor?.name}
                />
              ) : (
                <Avatar className="h-10 w-10 rounded-full bg-blue-600 ring-1">
                  {selectedCourse?.instructor?.name?.slice(0, 1)?.toUpperCase()}
                </Avatar>
              )}

              <div>
                <h3 className="text-lg font-semibold">
                  {selectedCourse?.instructor?.name}
                </h3>
                <p className="text-sm text-red-600 font-semibold">
                  This course has already an instructor. By assigning new
                  instructor the assigned instructor will be replaced.
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AssignCourse;
