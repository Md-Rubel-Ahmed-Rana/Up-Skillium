/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd/lib";
import { useUserRegisterMutation } from "@/features/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type FieldType = {
  name: string;
  email: string;
  role: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const [register, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (data) => {
    try {
      data.role = "student";
      const response: any = await register(data);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "User register successful");
        router.push("/login");
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
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoFocus
      layout="vertical"
      className="w-full font-semibold"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          iconPosition="end"
          disabled={isLoading}
          className="w-full"
          type="primary"
          htmlType="submit"
        >
          {isLoading ? "Loading" : "Register"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
