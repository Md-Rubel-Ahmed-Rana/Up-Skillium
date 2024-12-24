import { useGetStudentsByCourseQuery } from "@/features/course";
import { IUser } from "@/types/user.type";
import { Form, Select } from "antd/lib";

type Props = {
  courseId: string;
};

const SelectStudentsAttendees = ({ courseId }: Props) => {
  const { data, isLoading } = useGetStudentsByCourseQuery(
    { courseId },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const students = data?.data as IUser[];

  return (
    <Form.Item
      name="students"
      label="Students"
      rules={[{ required: true, message: "Please select students" }]}
      dependencies={["students", courseId]}
    >
      <Select
        mode="multiple"
        placeholder="Select students"
        loading={isLoading}
        allowClear
        showSearch
        className="w-full"
      >
        {students?.map((student) => (
          <Select.Option key={student?.id} value={student?.id}>
            {student?.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectStudentsAttendees;
