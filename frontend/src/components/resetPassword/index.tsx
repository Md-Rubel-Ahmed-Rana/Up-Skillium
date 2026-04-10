import { useVerifyResetTokenQuery } from "@/features/auth";
import { Alert, Button, Spin } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const { query } = useRouter();
  const token = query.token as string;

  const { isLoading, error, isError }: any = useVerifyResetTokenQuery({
    token,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        {isError ? (
          <>
            <Alert
              message="Error"
              description={error?.data?.message || "Something went wrong."}
              type="error"
              showIcon
              className="mb-4"
            />
            <p className="flex justify-end">
              <Link href={"/forget-password"}>
                <Button type="primary">Resend</Button>
              </Link>
            </p>
          </>
        ) : (
          <ResetPasswordForm />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
