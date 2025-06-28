import Link from "next/link";
import { FiInfo } from "react-icons/fi";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center px-4 max-w-md mx-auto">
      <div className="bg-gray-100 p-3 rounded-md flex flex-col gap-5 justify-center items-center w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 font-serif">
          Welcome back!
        </h2>
        <p className="text-xs text-yellow-600 text-center flex items-center justify-center gap-2 m-0">
          <FiInfo className="text-base" />
          <span>
            Please ensure that third-party cookies are enabled <br /> in your
            browser to log in successfully.
          </span>
        </p>
        <LoginForm />
        <p className="text-center text-gray-600">
          <span>Haven&apos;t account? </span>
          <Link className="text-yellow-500 font-extrabold" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
