import { useUserLoginMutation } from "@/features/auth";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { MdEmail, MdLock } from "react-icons/md";

const loginCredentials = {
  student: { email: "abdurrahman123@gmail.com", password: "AbdurRahman123@" },
  instructor: {
    email: "mohinuddinrubel9660@gmail.com",
    password: "MohinUddin9660@",
  },
  admin: {
    email: "mdrubelahmedrana521@gmail.com",
    password: "RubelAhmed521@",
  },
};

type FieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const router = useRouter();

  const handleLogin: FormProps<FieldType>["onFinish"] = async (data) => {
    try {
      const response: any = await loginUser(data);
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "User login successful");
        router.push("/dashboard/profile-info");
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

  const handleAutoLogin = async (role: keyof typeof loginCredentials) => {
    const credentials = loginCredentials[role];
    form.setFieldsValue(credentials);
    try {
      const response: any = await loginUser(credentials);
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "User login successful");
        router.push("/dashboard/profile-info");
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
    <div>
      <div className="flex gap-2 mb-4">
        <span className="font-medium">Auto login as:</span>
        <Button size="small" onClick={() => handleAutoLogin("student")}>
          Student
        </Button>
        <Button size="small" onClick={() => handleAutoLogin("instructor")}>
          Instructor
        </Button>
        <Button size="small" onClick={() => handleAutoLogin("admin")}>
          Admin
        </Button>
      </div>
      <Form
        form={form}
        name="User Login Form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoFocus
        layout="vertical"
        className="w-full"
        disabled={isLoading}
      >
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
            autoFocus
            size="large"
            name="email"
            placeholder="Please enter your email"
            prefix={<MdEmail />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            size="large"
            name="password"
            placeholder="Please enter password"
            prefix={<MdLock />}
          />
        </Form.Item>
        <p className="-mt-3 mb-3">
          <Link className="text-blue-500 underline" href={"/forget-password"}>
            Forget password?
          </Link>
        </p>
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
            {isLoading ? "Loading" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
