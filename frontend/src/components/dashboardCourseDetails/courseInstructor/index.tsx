import { IInstructor } from "@/types/course.type";
import { Descriptions } from "antd/lib";
import { useMediaQuery } from "react-responsive";
import ReAssignInstructor from "./ReAssignInstructor";

type Props = {
  instructor: IInstructor;
};

const CourseInstructor = ({ instructor }: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });

  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span>Course Instructor</span>
          <ReAssignInstructor />
        </div>
      }
      column={2}
      bordered
      className="mt-4 pb-4"
    >
      <Descriptions.Item label="Image" span={isLargeDevice ? 1 : 2}>
        <div className="flex items-center gap-4">
          <img
            src={instructor?.image}
            alt={instructor?.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <span className="text-gray-600 hidden lg:block">Profile Image</span>
        </div>
      </Descriptions.Item>

      <Descriptions.Item label="Name" span={isLargeDevice ? 1 : 2}>
        <div className="text-md l:text-lg font-semibold text-gray-800">
          {instructor?.name}
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CourseInstructor;
