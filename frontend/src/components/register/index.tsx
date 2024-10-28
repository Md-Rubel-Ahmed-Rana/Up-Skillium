/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import verifyStrongPassword from "@/utils/verifyStrongPassword";
import { RxCross1 } from "react-icons/rx";
import { useCreateStudentMutation } from "@/features/student";
import toast from "react-hot-toast";

const Button = dynamic(() => import("antd/lib/button"), { ssr: false });
const Input = dynamic(() => import("antd/lib/input"), { ssr: false });
const InputPassword = dynamic(() => import("antd/lib/input/Password"), { ssr: false });

type FieldType = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldType>({ mode: "onChange" });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [createStudent, { isLoading }] = useCreateStudentMutation();

  // api related code
  const handleRegister: SubmitHandler<FieldType> = async (data) => {
    console.log(data);
    try {
      const response: any = await createStudent(data);
      if (response?.data?.statusCode === 201) {
        toast.success(response?.data?.message || "Create Student successfully");
      } else {
        toast.error(
          response?.data?.message ||
            response?.data?.error?.message ||
            "Something went wrong. Please try again!"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server error occurred");
    }
  };

  const handlePasswordChange = (password: string) => {
    const errors = verifyStrongPassword(password);
    setPasswordErrors(errors);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        className="bg-gray-200 w-full max-w-lg shadow-lg rounded-lg space-y-8 p-8"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h2 className="text-2xl font-bold text-center font-serif text-gray-800">
          Create Your Learning Account Today!
        </h2>

        <div>
          <input
            className="w-full"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            className="w-full"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="my-3">
          <input
            className="w-full"
            {...register("password", {
              required: "Password is required",
              onChange: (e) => {
                handlePasswordChange(e.target.value);
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm flex items-center gap-2">
              {errors.password?.message}
            </p>
          )}
          {!errors.password && passwordErrors.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {passwordErrors.map((error, index) => (
                <p
                  className="text-red-500 text-sm flex items-center gap-2"
                  key={index}
                >
                  <RxCross1 className="bg-red-500 text-white rounded-md p-1 text-lg" />
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        <Button type="primary" htmlType="submit" className="w-full">
          Register
        </Button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-yellow-500 font-extrabold" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
