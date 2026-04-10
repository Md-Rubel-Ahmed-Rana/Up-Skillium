import { useLogoutMutation } from "@/features/auth";
import { Button } from "antd/lib";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();

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
    <Button
      disabled={isLoading}
      onClick={handleLogout}
      icon={<FaSignOutAlt />}
    />
  );
};

export default LogoutButton;
