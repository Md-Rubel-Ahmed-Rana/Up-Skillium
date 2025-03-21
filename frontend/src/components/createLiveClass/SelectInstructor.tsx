import { useGetAllUsersQuery } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Form, FormInstance, Select } from "antd/lib";
const { Option } = Select;

type Props = {
  form: FormInstance;
};

const SelectInstructor = ({ form }: Props) => {
  const { data, isLoading } = useGetAllUsersQuery({});
  const instructors = data?.data as IUser[];
  const instructorUsers = instructors.filter(
    (user) => user?.role?.name === "instructor"
  );

  const handleSelectInstructor = (courseId: string) => {
    form.setFieldValue("course", courseId);
  };
  return (
    <Form.Item
      name="instructor"
      label="Instructor"
      rules={[{ required: true, message: "Please select an instructor!" }]}
    >
      <Select
        onChange={handleSelectInstructor}
        placeholder="Select an instructor"
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
