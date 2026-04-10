import { useRouter } from "next/router";
import ChangePasswordForm from "./ChangePasswordForm";

const UserPasswordChange = () => {
  const { query } = useRouter();
  const userName = query?.name as string;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Change Password
      </h2>
      <p className="text-gray-600 text-center mt-2">Updating password for:</p>
      <p className="text-xl font-medium text-center text-blue-600 mt-1">
        {userName}
      </p>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UserPasswordChange;
