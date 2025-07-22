import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { BsGoogle } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneMockup from "../component/PhoneMockUp";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { signup, userAuth } from "../store/storeSlice/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector(userAuth);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-4xl mx-auto my-auto h-full flex">
      <div className="flex flex-col gap-5  flex-1/2 justify-center h-full">
        <div className="border p-4 w-full flex flex-col bg-primary/10 py-10">
          <div className=" flex">
            <div className="mx-auto flex items-center">
              <div className="size-18 pb-1">
                <img
                  src="/lynx_gradient.svg"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <h2 className="text-5xl font-bold font-['GeneralSans-bold'] text-center">
                    LYNX
                  </h2>
                </div>
                <p className="font-['Khand-regular'] text-muted-foreground">
                  Create. Connect. Capture life, your way.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-8">
            <div className="px-5">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-4 w-full">
                <div className="flex items-center justify-center bg-white rounded-full size-6 mr-1">
                  <BsGoogle className="w-4 h-4 text-primary" />
                </div>
                Login with Google
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground px-5 opacity-50">
              <div className="flex-grow border-t border-border" />
              <span className="font-['GeneralSans-regular']">OR</span>
              <div className="flex-grow border-t border-border" />
            </div>

            <div className="px-5 rounded-xl ">
              {error && (
                <p className="text-red-500 text-sm font-medium text-center">
                  {error}
                </p>
              )}
              <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-['GeneralSans-Medium'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      name="fullName"
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="font-['GeneralSans-Regular'] flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label className="text-sm font-['GeneralSans-Medium'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      name="username"
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="Choose a username"
                      className="font-['GeneralSans-Regular'] flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-['GeneralSans-Medium'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      name="email"
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="Enter your email"
                      className="font-['GeneralSans-Regular'] flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      name="password"
                      onChange={handleChange}
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground " />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-center w-80  mx-auto mt-5">
                  <p className="text-xs text-muted-foreground">
                    People who use our service may have uploaded your contact
                    information to Instagram.
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium">
                      {" "}
                      Learn More
                    </Link>
                  </p>
                </div>
                <div className="text-center w-80 mx-auto mt-5">
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our Terms,
                    <Link
                      to="/login"
                      className="text-primary hover:underline font-medium">
                      {" "}
                      Privacy Policy and Cookies Policy .
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin size-5 mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center border p-5 bg-primary/10">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <div className="flex-1/2">
        <PhoneMockup />
      </div>
    </div>
  );
};

export default SignupPage;
