"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "../api/userApi";
import { constants } from "../utilites/constants";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.password) {
      newErrors.password = "Password is required!";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "confirm password field is required!";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.form = "Passwords do not match!";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Validation for email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add submit logic here

    const signUp = async () => {
      try {
        const response = await createUser(
          formData.username,
          formData.email,
          formData.password,
        );

        if (response.success) {
          console.log("Form Submitted", formData);
          alert("Registration succesful");
          //`Redirect to login page after successful registration`,
          router.push("/login");
        } else {
          setErrors({ form: response.message });
        }
      } catch (error) {
        console.log(error)
        setErrors({
          form: "An error occurred during sign up. Please try again.",
        });
      }
    };

    signUp();
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-blaze-orange-100 to-blaze-orange-200">
      <div className="grid grid-cols-1 w-4/6 max-w-md p-6 bg-white rounded-lg shadow-lg place-items-center">
        <h2 className="text-2xl font-semibold mb-4 text-blaze-orange-600">
          {constants.signUp}
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* username field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* email field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* password field */}
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

          {/* confirm password field */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
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
              {constants.rememberFor30Days}
            </label>
          </div>
          <button
            type="submit"
            className="w-2/6 py-2 my-auto mx-auto flex justify-center items-center bg-blaze-orange-500 text-white rounded hover:bg-blaze-orange-600"
          >
            {constants.signUp}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {constants.alreadyHaveAnAccount}
            <Link
              href="/login"
              className="text-blaze-orange-500 hover:underline"
            >
              {constants.signIn}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
