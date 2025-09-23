import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User, Mail, Phone, Image, Send } from "lucide-react";

const Register = ({ setTogggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data
      );
      if (response) {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log("error in regitartion->", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Profile
          </h1>
          <p className="text-gray-600">Fill in your details to get started</p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6"
        >
          {/* First Name */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* username */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              UserName
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                {...register("username", { required: "username is required" })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.username ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="tel"
                maxLength={10}
                {...register("mobile", {
                  required: "Mobile number is required",
                  minLength: {
                    value: 10,
                    message: "Must be exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Must be exactly 10 digits",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Only digits allowed",
                  },
                })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.mobile ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your mobile number"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            </div>

            <input
              type="password"
              {...register("password", {
                required: "password is required",
              })}
              className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Password"
            />
          </div>

          {/* Profile Image URL */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                {...register("imageUrl", {
                  required: "Profile image URL is required",
                })}
                className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
                  errors.imageUrl ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {errors.imageUrl && (
              <p className="text-red-600 text-sm mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {/* Additional Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setTogggle((prev) => !prev)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By submitting, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
