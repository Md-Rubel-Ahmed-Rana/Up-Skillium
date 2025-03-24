import { useResetPasswordMutation } from "@/features/user";
import { Button, Form, Input } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
  const { query, push } = useRouter();
  const userId = query?.userId as string;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (values: any) => {
    const errorText = "Failed to change password";
    try {
      const res: any = await resetPassword({
        id: userId,
        password: values?.password,
      });
      if (res?.data?.statusCode === 200) {
        toast.success("Password changed successfully");
        push("/dashboard/manage-users");
      } else {
        toast.error(
          res?.data?.message ||
            res?.error?.message ||
            res?.data?.error?.message ||
            res?.error?.data?.message ||
            errorText
        );
      }
    } catch (error) {
      toast.error(errorText);
    }
  };

  return (
    <Form onFinish={handleSubmit} className="w-full">
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input new password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="primary"
          htmlType="submit"
          loading={isLoading}
          iconPosition="end"
          disabled={isLoading}
        >
          {isLoading ? "Changing Password..." : "Change Password"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
