/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center px-4 max-w-md mx-auto">
      <div className="bg-gray-100 p-5 rounded-md flex flex-col gap-10 justify-center items-center w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 font-serif">
          Welcome back!
        </h2>
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
