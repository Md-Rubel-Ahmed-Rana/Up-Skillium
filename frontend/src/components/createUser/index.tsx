import { useUserRegisterMutation } from "@/features/auth";
import passwordValidationRegx from "@/utils/verifyStrongPassword";
import { Button, Form, FormProps, Input, Tooltip } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaUserCircle } from "react-icons/fa";
import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { MdEmail, MdLock } from "react-icons/md";

type FieldType = {
  name: string;
  email: string;
  role: string;
  password: string;
};

type Props = {
  formTitle: string;
  role: "admin" | "student" | "instructor";
  successRoute:
    | "/dashboard/manage-students"
    | "/dashboard/manage-instructors"
    | "/dashboard/manage-admins"
    | "/dashboard/profile-info";
  buttonText?: string;
};

const CreateUser = ({ formTitle, role, successRoute, buttonText }: Props) => {
  const [form] = Form.useForm();
  const [register, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const handleRegister: FormProps<FieldType>["onFinish"] = async (data) => {
    try {
      data.role = role?.toLowerCase();
      const response: any = await register(data);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "User register successful");
        if (successRoute) {
          router.push(successRoute);
        } else {
          form.resetFields();
        }
      } else {
        toast.error(
          response?.data?.message ||
            response?.error?.data?.message ||
            "Something went wrong. Please try again!"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server error occurred");
    }
  };

  return (
    <Form
      form={form}
      name="User Register Form"
      initialValues={{ remember: true }}
      onFinish={handleRegister}
      layout="vertical"
      className="w-full p-4 bg-gray-50 shadow-md rounded-md"
    >
      <h2 className="text-lg lg:text-2xl font-semibold text-center">
        {formTitle}
      </h2>
      <Form.Item<FieldType>
        label={
          <span className="flex items-center gap-2">
            Name{" "}
            <Tooltip title="Name cannot be changed in the future">
              <FaExclamationCircle style={{ color: "#faad14" }} />
            </Tooltip>
          </span>
        }
        name="name"
        rules={[
          { required: true, message: "Name is required" },
          { min: 3, message: "Name must be at least 3 characters" },
          { max: 30, message: "Name must be less than 30 characters" },
        ]}
      >
        <Input
          type="text"
          size="large"
          name="name"
          autoFocus
          placeholder="Enter name"
          prefix={<FaUserCircle />}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <span className="flex items-center gap-2">
            Email{" "}
            <Tooltip title="Email cannot be changed in the future">
              <FaExclamationCircle style={{ color: "#faad14" }} />
            </Tooltip>
          </span>
        }
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input
          type="email"
          size="large"
          name="email"
          placeholder="Enter email"
          prefix={<MdEmail />}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 7, message: "Password must be at least 7 characters" },
          { max: 15, message: "Password must be less than 15 characters" },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Example: 'Password12@'"
          name="password"
          prefix={<MdLock />}
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        {({ getFieldValue }) => {
          const password = getFieldValue("password") || "";
          return (
            <ul className="flex flex-wrap gap-2">
              <li className="flex items-center gap-2 border px-1 rounded-md">
                {password.match(passwordValidationRegx[0].pattern) ? (
                  <IoMdCheckmarkCircle color="green" />
                ) : (
                  <IoMdClose color="red" />
                )}
                Number
              </li>
              <li className="flex items-center gap-2 border px-1 rounded-md">
                {password.match(passwordValidationRegx[1].pattern) ? (
                  <IoMdCheckmarkCircle color="green" />
                ) : (
                  <IoMdClose color="red" />
                )}
                Uppercase
              </li>
              <li className="flex items-center gap-2 border px-1 rounded-md">
                {password.match(passwordValidationRegx[2].pattern) ? (
                  <IoMdCheckmarkCircle color="green" />
                ) : (
                  <IoMdClose color="red" />
                )}
                Lowercase
              </li>
              <li className="flex items-center gap-2 border px-1 rounded-md">
                {password.match(passwordValidationRegx[3].pattern) ? (
                  <IoMdCheckmarkCircle color="green" />
                ) : (
                  <IoMdClose color="red" />
                )}
                Special character
              </li>
            </ul>
          );
        }}
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          iconPosition="end"
          disabled={isLoading}
          className="w-full"
          type="primary"
          htmlType="submit"
          size="large"
        >
          {isLoading ? "Creating..." : `${buttonText || "Register"}`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
