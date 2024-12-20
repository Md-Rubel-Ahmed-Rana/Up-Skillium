import { useGetAllInstructorsQuery } from "@/features/instructor";
import { IInstructor } from "@/types/instructor.type";
import { IUser } from "@/types/user.type";
import { Form, FormInstance, Select } from "antd/lib";
const { Option } = Select;

type Props = {
  form: FormInstance;
};

const SelectInstructor = ({ form }: Props) => {
  const { data, isLoading } = useGetAllInstructorsQuery({});
  const instructors = (data?.data as IInstructor[]) || [];
  const instructorUsers: IUser[] =
    instructors.map((instructor) => instructor?.user) || [];

  const handleSelectInstructor = (courseId: string) => {
    form.setFieldValue("course", courseId);
  };
  return (
    <Form.Item
      name="course"
      label="Course"
      rules={[{ required: true, message: "Please select a course!" }]}
    >
      <Select
        onChange={handleSelectInstructor}
        placeholder="Select your course"
        className="w-full"
        loading={isLoading}
      >
        {instructorUsers?.map((user) => (
          <Option key={user?.id} value={user?.id}>
            {user?.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectInstructor;
