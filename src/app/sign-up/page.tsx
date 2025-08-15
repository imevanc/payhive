"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/auth/db";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_\-+=[\]{}|;:,.<>?]{8,12}$/;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    registerUser(data.email, data.password, data.firstName, data.lastName);
  };
  return (
    <main className="flex items-center justify-center p-4 lg:py-14">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-md p-6 sm:p-8">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center justify-center">
            <span className="text-2xl lg:text-3xl font-bold text-gray-900">
              PayHive
            </span>
          </Link>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z'-]+$/,
                    message: "Only letters, apostrophes, and dashes allowed",
                  },
                })}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-600"
                    : "border-gray-300 focus:ring-green-600"
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-z'-]+$/,
                    message: "Only letters, apostrophes, and dashes allowed",
                  },
                })}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-600"
                    : "border-gray-300 focus:ring-green-600"
                }`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-600"
                  : "border-gray-300 focus:ring-green-600"
              }`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must be 8–12 characters, include uppercase, lowercase, number, and special character",
                },
              })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-600"
                  : "border-gray-300 focus:ring-green-600"
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1 space-y-1">
                <p>{errors.password.message}</p>
                {!/^.{8,12}$/.test(watch("password")) && (
                  <p>• Must be 8–12 characters</p>
                )}
                {!/[A-Z]/.test(watch("password")) && (
                  <p>• Must include an uppercase letter</p>
                )}
                {!/[a-z]/.test(watch("password")) && (
                  <p>• Must include a lowercase letter</p>
                )}
                {!/\d/.test(watch("password")) && (
                  <p>• Must include a number</p>
                )}
                {!/[!@#$%^&*()_\-+=[\]{}|;:,.<>?]/.test(watch("password")) && (
                  <p>• Must include a special character</p>
                )}
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-600"
                  : "border-gray-300 focus:ring-green-600"
              }`}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register("agreeToTerms", {
                required: "You must agree to the terms",
              })}
              className={`h-4 w-4 rounded mt-1 accent-green-600 focus:ring-green-500 ${
                errors.agreeToTerms
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-300"
              }`}
            />

            <label
              htmlFor="agreeToTerms"
              className="ml-2 text-sm text-gray-600"
            >
              I agree to the{" "}
              <Link href="#" className="text-green-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-green-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.agreeToTerms.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="my-6 flex items-center justify-between">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button className="w-12 h-12 bg-white border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6 object-contain"
            />
          </button>
          <button className="w-12 h-12 bg-white border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100">
            <img
              src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.jpg"
              alt="X"
              className="w-8 h-8 object-contain"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
