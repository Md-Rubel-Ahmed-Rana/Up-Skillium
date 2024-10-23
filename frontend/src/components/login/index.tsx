import React from "react";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

const Button = dynamic(() => import("antd/lib/button"), { ssr: false });
const Input = dynamic(() => import("antd/lib/input"), { ssr: false });
const InputPassword = dynamic(() => import("antd/lib/input/Password"), { ssr: false });

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>();

  const handleRegister: SubmitHandler<FieldType> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        className="bg-slate-200 p-6 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 font-serif">
          Welcome back!
        </h2>

        <div>
          <Input
            className="w-full py-2"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <InputPassword
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="w-full">
          Login
        </Button>

        <p className="text-center text-gray-600">
          Haven&apos;t account?{" "}
          <Link className="text-yellow-500 font-extrabold" href="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
