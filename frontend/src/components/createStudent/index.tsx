import { useUserRegisterMutation } from "@/features/auth";
import passwordValidationRegx from "@/utils/verifyStrongPassword";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { MdEmail, MdLock } from "react-icons/md";

type FieldType = {
  name: string;
  email: string;
  role: string;
  password: string;
};

const CreateStudent = () => {
  const [register, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const handleRegister: FormProps<FieldType>["onFinish"] = async (data) => {
    try {
      data.role = "student";
      const response: any = await register(data);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "User register successful");
        router.push("/dashboard/manage-students");
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
    <div className="w-full lg:w-1/2 mx-auto h-screen flex justify-center items-center">
      <Form
        name="User Register Form"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        layout="vertical"
        className="w-full p-4 bg-gray-50 shadow-md rounded-md"
      >
        <h2 className="text-lg lg:text-2xl font-semibold text-center">
          Create Student
        </h2>
        <Form.Item<FieldType>
          label="Name"
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
            placeholder="Enter student name"
            prefix={<FaUserCircle />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
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
            placeholder="Enter student email"
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
              <ul>
                <li className="flex items-center gap-2">
                  {password.match(passwordValidationRegx[0].pattern) ? (
                    <IoMdCheckmarkCircle color="green" />
                  ) : (
                    <IoMdClose color="red" />
                  )}
                  Number
                </li>
                <li className="flex items-center gap-2">
                  {password.match(passwordValidationRegx[1].pattern) ? (
                    <IoMdCheckmarkCircle color="green" />
                  ) : (
                    <IoMdClose color="red" />
                  )}
                  Uppercase
                </li>
                <li className="flex items-center gap-2">
                  {password.match(passwordValidationRegx[2].pattern) ? (
                    <IoMdCheckmarkCircle color="green" />
                  ) : (
                    <IoMdClose color="red" />
                  )}
                  Lowercase
                </li>
                <li className="flex items-center gap-2">
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
            {isLoading ? "Creating..." : "Create Now"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateStudent;
