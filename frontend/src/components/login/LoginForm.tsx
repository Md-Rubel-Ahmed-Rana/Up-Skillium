import { useUserLoginMutation } from "@/features/auth";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { MdEmail, MdLock } from "react-icons/md";

type FieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
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

  return (
    <Form
      name="User Login Form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      autoFocus
      layout="vertical"
      className="w-full"
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
  );
};

export default LoginForm;
