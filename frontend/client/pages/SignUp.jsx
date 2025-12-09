import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("SignUp attempted with:", name, email, password);
  };

  const handleGoogleSignUp = () => {
    console.log("Google signup clicked");
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content - Split Screen */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] mt-[65px]">
        {/* Left Panel - SignUp Form */}
        <div className="w-full lg:w-[50%] flex items-center justify-center bg-gray-50 px-4 sm:px-8 py-1 overflow-y-auto">
          <div className="w-full max-w-md my-auto">
            {/* SignUp Title */}
            <h1
              className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-[#44444E] text-center mb-1"
              style={{ fontFamily: "Roboto Mono" }}
            >
              Sign Up
            </h1>


            {/* Feature Badges - All in One Line */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#317249] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span
                  className="text-[#44444E] text-sm sm:text-base lg:text-md font-normal whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  AI Legal Help
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#317249] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span
                  className="text-[#44444E] text-sm sm:text-base lg:text-md font-normal whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  24/7 Support
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#317249] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span
                  className="text-[#44444E] text-sm sm:text-base lg:text-md font-normal whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  Data Privacy
                </span>
              </div>
            </div>

            {/* SignUp Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#666666] text-sm font-semibold mb-1"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full lg:w-[95%] px-2 py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                  placeholder="Enter Full Name"
                  style={{ fontFamily: "Noto Sans" }}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#666666] text-sm font-semibold mb-1"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full lg:w-[95%] px-2 py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                  placeholder="Enter email"
                  style={{ fontFamily: "Noto Sans" }}
                  required
                />
              </div>

              {/* Password Field with Eye Icon */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[#666666] text-sm font-semibold mb-1"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Password
                </label>
                <div className="relative w-full lg:w-[95%]">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e. target.value)}
                    className="w-full px-2 py-1.5 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter Password"
                    style={{ fontFamily: "Noto Sans" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29473E] transition-colors"
                  >
                    {showPassword ?  (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field with Eye Icon */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[#666666] text-sm font-semibold mb-1"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Confirm Password
                </label>
                <div className="relative w-full lg:w-[95%] mb-2 ">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-2 py-1.5 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter Password Again"
                    style={{ fontFamily: "Noto Sans" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(! showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29473E] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* SignUp Button */}
              <button
                type="submit"
                className="w-full lg:w-[95%] bg-[#29473E] text-white py-2 rounded-lg text-base font-medium hover:bg-[#1f3630] hover:shadow-lg transition-all duration-300 mt-3"
                style={{ fontFamily: "Noto Sans" }}
              >
                Sign Up
              </button>
            </form>

            {/* Divider Line with OR */}
            <div className="flex items-center my-3 w-full lg:w-[95%]">
              <div className="flex-1 border-t-2 border-gray-300"></div>
              <span className="px-3 text-gray-500 text-xs font-medium">OR</span>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            {/* Continue with Google */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full lg:w-[95%] bg-white border-2 border-gray-800 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
              style={{ fontFamily: "Inter" }}
            >
              <img
                src="/google-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            
          </div>
        </div>

        {/* Right Panel - Large Image */}
        <div className="hidden lg:flex w-full lg:w-[43%] relative items-center justify-center bg-white">
          <img
            src="/legal-illustration.png"
            alt="Legal Justice Illustration"
            className="w-full h-full object-cover p-8"
            onError={(e) => {
              e.target.src = "/auth.png";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;