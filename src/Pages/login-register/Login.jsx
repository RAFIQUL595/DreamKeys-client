import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/lottie/login.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call signIn function and handle errors
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setError("Email does not match our records.");
        } else if (err.code === "auth/wrong-password") {
          setError("Password is incorrect.");
        } else {
          setError("Check Your Email or Password & try again.");
        }
      });
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-[#97B522] dark:bg-gray-900">
  {/* Animation Section */}
  <div className="hidden md:flex justify-end items-center">
    <div className="flex justify-center items-center h-screen">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "600px", width: "600px" }}
      />
    </div>
  </div>

  {/* Login Form Section */}
  <div className="flex items-center justify-center md:justify-start">
    <div className="flex-1 flex justify-center items-center p-6 md:p-10">
      <form
        onSubmit={handleLogin}
        className="space-y-4 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        {/* Back Button */}
        <Link
          to={"/"}
          className="text-sm md:text-2xl text-left text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ⬅Back
        </Link>

        {/* Welcome Message */}
        <h2 className="text-xl md:text-2xl text-center font-bold text-gray-800 dark:text-gray-100 mb-2">
          Welcome Back
        </h2>
        <h2 className="text-xl text-center font-bold text-gray-800 dark:text-gray-100 mb-2">
          Login Here ❤
        </h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border p-2 w-full rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2 dark:bg-red-200 dark:text-red-800">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          LOGIN
        </button>

        {/* Social Login */}
        <SocialLogin />

        {/* Register Link */}
        <p className="text-gray-600 text-center dark:text-gray-400">
          <Link
            to="/sign-up"
            className="text-green-500 hover:underline font-semibold dark:text-green-400"
          >
            Don&apos;t Have an account? Register Here →
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>
  );
};

export default Login;