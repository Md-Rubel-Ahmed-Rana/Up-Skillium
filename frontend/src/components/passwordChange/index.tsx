import { useGetLoggedInUserQuery, useLogoutMutation } from "@/features/auth";
import { useChangePasswordMutation } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Button, Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [updatePassword, { isLoading }] = useChangePasswordMutation();
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleValuesChange = (
    _: any,
    allValues: { oldPassword: string; newPassword: string }
  ) => {
    const { oldPassword, newPassword } = allValues;

    if (newPassword && oldPassword === newPassword) {
      setError("New password cannot be the same as the old password.");
    } else {
      setError(null);
    }
  };

  const handleChangePassword = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    if (!error) {
      try {
        const result: any = await updatePassword({
          userId: user?.id,
          passwords: values,
        });
        if (result?.data?.statusCode === 200) {
          toast.success(
            result?.data?.message || "Password changed successfully!"
          );
          window.location.replace("/login");
          await logout({});
        } else {
          toast.error(
            result?.error?.message ||
              result?.error?.data?.message ||
              result?.data?.error?.message ||
              "Failed to change password."
          );
        }
      } catch (error: any) {
        toast.error(`Failed to change password. Error: ${error?.message}`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleChangePassword}
        onValuesChange={handleValuesChange}
        className="space-y-4"
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            { required: true, message: "Please enter your old password" },
          ]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password" },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
              message:
                "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
            },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
            disabled={!!error || isLoading}
            loading={isLoading}
            iconPosition="end"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordChange;
