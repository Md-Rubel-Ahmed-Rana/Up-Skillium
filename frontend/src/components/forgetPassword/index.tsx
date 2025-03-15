import { useForgetPasswordMutation } from "@/features/auth";
import { Button, Card, Form, FormProps, Input, Typography } from "antd/lib";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const { Title, Paragraph } = Typography;

type FieldType = {
  email: string;
};

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sendResetMail, { isLoading }] = useForgetPasswordMutation();
  const handleSubmit: FormProps<FieldType>["onFinish"] = async ({ email }) => {
    try {
      const res: any = await sendResetMail({ email });
      if (res?.data?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "<strong>Reset link sent!</strong>",
          position: "center",
          text:
            res?.data?.message ||
            "Reset email sent successfully. Please check your email!",
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: "Got it",
          confirmButtonColor: "#d33",
          backdrop: true,
        });
        router.push("/");
      } else {
        toast.error(
          res?.data?.message ||
            res?.error?.data?.message ||
            "Something went wrong. Please try again!"
        );
      }
    } catch (error) {
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="lg:mt-0 -mt-20 max-w-md w-full shadow-md rounded-md">
        <Title className="text-center" level={3}>
          Forgot Your Password?
        </Title>
        <Paragraph className="text-center">
          Enter your registered email below, and we&apos;ll send you
          instructions to reset your password.
        </Paragraph>

        <Form
          name="forget_password"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={!email || isLoading}
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              iconPosition="end"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
