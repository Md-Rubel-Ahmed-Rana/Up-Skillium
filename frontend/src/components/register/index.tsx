/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen px-4 max-w-md mx-auto">
      <div className="bg-gray-100 p-5 rounded-md flex flex-col gap-5 justify-center items-center w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 font-serif">
          Create your student account today!
        </h2>
        <RegisterForm />
        <p className="text-center text-gray-600">
          <span>Already have an account? </span>
          <Link className="text-yellow-500 font-extrabold" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
