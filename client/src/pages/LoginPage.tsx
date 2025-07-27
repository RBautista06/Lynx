import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneMockup from "../component/PhoneMockUp";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import { login, userAuth } from "../store/storeSlice/authSlice";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(userAuth);

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      setFormData({ emailOrUsername: "", password: "" });
      navigate("/"); // ✅ redirect
    }
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
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {" "}
                {error}
              </p>
            )}
            <div className="px-5 rounded-xl ">
              <form className="space-y-2" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-['GeneralSans-Medium'] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                      onChange={handleChange}
                      name="emailOrUsername"
                      type="text"
                      placeholder="Enter your email / username"
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
                      onChange={handleChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      // value={formData.password}
                      // onChange={(e) =>
                      //   setFormData({ ...formData, password: e.target.value })
                      // }
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
                <button
                  type="submit"
                  // disabled={isSigningUp}
                  className="mt-5 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin size-5 mr-2" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4 text-sm text-muted-foreground  my-5 opacity-50">
                <div className="flex-grow border-t border-border" />
                <span className="font-['GeneralSans-regular']">OR</span>
                <div className="flex-grow border-t border-border" />
              </div>

              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground cursor-pointer h-10 px-4 py-4 w-full">
                <div className="flex items-center justify-center bg-primary rounded-full size-6 mr-1">
                  <BsGoogle className="w-4 h-4 " />
                </div>
                <span className="text-primary">Login with Google</span>
              </button>

              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground cursor-pointer **: w-full">
                <span className="">Forgot Password?</span>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center border p-5 bg-primary/10">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium">
              Sign up
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
export default LoginPage;
