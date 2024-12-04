import Link from "next/link";
import CreateUser from "../createUser";

const Register = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center px-4 max-w-2xl mx-auto py-10">
      <CreateUser
        formTitle="Create your student account today!"
        role="student"
        successRoute="/dashboard/profile-info"
      />
      <p className="text-center text-gray-600">
        <span>Already have an account? </span>
        <Link className="text-yellow-500 font-extrabold" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
