import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { authApi } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/errorHandler";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:  "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useAuthRedirect('/platform');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target. name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Passwords do not match! ",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description:  "Password must be at least 6 characters long",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Split full name into firstName and lastName
      const nameParts = formData.firstName. trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts. slice(1).join(' ') || formData.lastName || nameParts[0];

      const result = await register({
        firstName,
        lastName,
        email: formData.email,
        password: formData. password,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to verify your account.",
        });
        navigate('/platform');
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: getErrorMessage(result.error),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    authApi.googleLogin();
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
              style={{ fontFamily:  "Roboto Mono" }}
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
                  className="text-[#44444E] text-sm sm: text-base lg:text-md font-normal whitespace-nowrap"
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
                  className="text-[#44444E] text-sm sm: text-base lg:text-md font-normal whitespace-nowrap"
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
                  htmlFor="firstName"
                  className="block text-[#666666] text-sm font-semibold mb-1"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full lg:w-[95%] px-2 py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                  placeholder="Enter Full Name"
                  style={{ fontFamily: "Noto Sans" }}
                  required
                  disabled={isLoading}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full lg:w-[95%] px-2 py-1.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                  placeholder="Enter email"
                  style={{ fontFamily: "Noto Sans" }}
                  required
                  disabled={isLoading}
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
                    name="password"
                    value={formData. password}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter Password"
                    style={{ fontFamily: "Noto Sans" }}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29473E] transition-colors"
                    disabled={isLoading}
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
                <div className="relative w-full lg:w-[95%] mb-2">
                  <input
                    type={showConfirmPassword ?  "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter Password Again"
                    style={{ fontFamily: "Noto Sans" }}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29473E] transition-colors"
                    disabled={isLoading}
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
                className="w-full lg:w-[95%] bg-[#29473E] text-white py-2 rounded-lg text-base font-medium hover:bg-[#1f3630] hover: shadow-lg transition-all duration-300 mt-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "Noto Sans" }}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Creating Account..." : "Sign Up"}
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
              className="w-full lg: w-[95%] bg-white border-2 border-gray-800 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Inter" }}
              disabled={isLoading}
            >
              <img
                src="/google-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account? {' '}
              <Link 
                to="/login" 
                className="text-[#29473E] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Large Image */}
        <div className="hidden lg:flex w-full lg:w-[41%] relative items-center justify-center bg-white">
          <img
            src="/auth.png"
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