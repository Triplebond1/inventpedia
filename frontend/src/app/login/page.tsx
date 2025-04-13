"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import loginUser from "../api/auth/login"; // Ensure this is an async function

export default function LogIn() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    remember: false,
  });

  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // If there are errors, set them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Attempt to login
    try {
      const response = await loginUser(
        formData.usernameOrEmail,
        formData.password
      );
      if (!response.success) {
        setErrors({ form: response.message });
      } else {
        alert("Logged in successfully!");
        //window.location.href = "/dashboard";
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blaze-orange-100 to-blaze-orange-200">
      <div className="grid grid-cols-1 w-4/6 max-w-md p-6 bg-white rounded-lg shadow-lg place-items-center">
        <h2 className="text-2xl font-semibold mb-4 text-blaze-orange-600">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Username or Email Field */}
          <div>
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Username or Email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.usernameOrEmail && (
              <p className="text-red-500 text-sm">{errors.usernameOrEmail}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* General Form Error */}
          {errors.form && (
            <p className="text-red-500 text-center">{errors.form}</p>
          )}

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              Remember for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-2/6 py-2 my-auto mx-auto flex justify-center items-center bg-blaze-orange-500 text-white rounded hover:bg-blaze-orange-600"
          >
            Log In
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blaze-orange-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
