/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd/lib';
import toast from 'react-hot-toast';
import { useCreateStudentMutation } from '@/features/student';

type FieldType = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [studentRegister, { isLoading }] = useCreateStudentMutation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (data) => {
    console.log('Success:', data);

    try {
      const response: any = await studentRegister(data);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "User registration successful");
      } else {
        toast.error(
          response?.data?.message ||
            response?.data?.error?.message ||
            "Something went wrong. Please try again!"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server error occurred");
    }
  };

  return (
    <div className='pt-20 flex items-center justify-center h-screen'>
      <Form
      className='bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-md space-y-6'
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
          Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
