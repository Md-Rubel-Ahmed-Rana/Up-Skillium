/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogoutMutation } from "@/features/auth";
import { Button, Typography } from "antd/lib";
import toast from "react-hot-toast";
const { Text } = Typography;

type Props = {
  isButton?: boolean;
  buttonStyles?: string;
};

const LogoutButton = ({ isButton, buttonStyles }: Props) => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response: any = await logout({});
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message || "Message was not found");
        window.location.replace("/");
      } else {
        toast.error(
          response?.data?.message ||
            response?.error?.data?.message ||
            "Failed to logout"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server side error occurred");
    }
  };

  return (
    <>
      {isButton ? (
        <Button
          onClick={handleLogout}
          className={`${buttonStyles && buttonStyles}`}
        >
          Logout
        </Button>
      ) : (
        <Text onClick={handleLogout}>Logout</Text>
      )}
    </>
  );
};

export default LogoutButton;
