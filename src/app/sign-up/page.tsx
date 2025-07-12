"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

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
        <div>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm lg:text-base font-medium text-gray-600 mb-2"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-3 lg:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base lg:text-lg"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm lg:text-base font-medium text-gray-600 mb-2"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-3 lg:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base lg:text-lg"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm lg:text-base font-medium text-gray-600 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 lg:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base lg:text-lg"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm lg:text-base font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 lg:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base lg:text-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm lg:text-base font-medium text-gray-600 mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 lg:p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-base lg:text-lg"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="h-4 w-4 lg:h-5 lg:w-5 rounded border-gray-300 focus:ring-green-500 focus:ring-2 accent-green-600 mt-1"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 text-sm lg:text-base text-gray-600"
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

          <button
            onClick={() => console.log("Sign up form submitted")}
            className="w-full bg-green-700 hover:bg-green-800 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-lg font-semibold transition-colors duration-200 text-base lg:text-lg"
          >
            Create account
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm lg:text-base text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-green-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <div className="my-6 flex items-center justify-between">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-sm lg:text-base text-gray-600">
            Or continue with
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="flex justify-center space-x-4">
          <button className="w-12 h-12 lg:w-14 lg:h-14 bg-white border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 transition duration-200">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6 lg:w-7 lg:h-7 object-contain"
            />
          </button>
          <button className="w-12 h-12 lg:w-14 lg:h-14 bg-white border border-gray-300 rounded-full flex justify-center items-center hover:bg-gray-100 transition duration-200">
            <img
              src="https://logos-world.net/wp-content/uploads/2023/08/X-Logo.jpg"
              alt="X"
              className="w-8 h-8 lg:w-9 lg:h-9 object-contain"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
