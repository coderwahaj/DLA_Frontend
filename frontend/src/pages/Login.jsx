import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { authApi } from "@/api/authApi";
import { useToast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/errorHandler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if already authenticated
  useAuthRedirect('/platform');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Success",
          description:  "Logged in successfully!",
        });
        navigate('/platform');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
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

  const handleGoogleLogin = () => {
    authApi.googleLogin();
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content - Split Screen */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-95px)] mt-[75px]">
        {/* Left Panel - Login Form */}
        <div className="w-full lg:w-[50%] flex items-center justify-center bg-gray-50 px-4 sm:px-8 py-4">
          <div className="w-full max-w-md">
            {/* Login Title */}
            <h1
              className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#44444E] text-center mb-3"
              style={{ fontFamily:  "Roboto Mono" }}
            >
              Login
            </h1>

            {/* Feature Badges - All in One Line */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-4 mb-5">
              <div className="flex items-center gap-1. 5">
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
                  className="text-[#44444E] text-sm sm:text-base lg:text-lg font-normal whitespace-nowrap"
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
                  className="text-[#44444E] text-sm sm: text-base lg:text-lg font-normal whitespace-nowrap"
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
                  className="text-[#44444E] text-sm sm: text-base lg:text-lg font-normal whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  Data Privacy
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#666666] text-sm lg:text-md font-semibold mb-1. 5"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target. value)}
                  className="w-full lg:w-[95%] px-3.5 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
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
                  className="block text-[#666666] text-sm lg:text-md font-semibold mb-1.5"
                  style={{ fontFamily: "Noto Sans" }}
                >
                  Password
                </label>
                <div className="relative w-full lg:w-[95%]">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter Password"
                    style={{ fontFamily: "Noto Sans" }}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(! showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#29473E] transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ?  (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password - OPENS MODAL */}
              <div className="flex justify-end pt-0. 5 w-full lg:w-[95%]">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#666666] text-sm lg:text-md font-semibold hover:text-[#29473E] transition-colors"
                  style={{ fontFamily: "Noto Sans" }}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full lg:w-[95%] bg-[#29473E] text-white py-2.5 rounded-lg text-base font-medium hover:bg-[#1f3630] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "Noto Sans" }}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider Line with OR */}
            <div className="flex items-center my-4 w-full lg:w-[95%]">
              <div className="flex-1 border-t-2 border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            {/* Continue with Google - USING PNG IMAGE */}
            <button
              onClick={handleGoogleLogin}
              className="w-full lg:w-[95%] bg-white border-2 border-gray-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account? {' '}
              <Link 
                to="/signUp" 
                className="text-[#29473E] font-semibold hover:underline"
              >
                Sign Up
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
              e.target.src = "/auth. png";
            }}
          />
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotModal} 
        onClose={() => setShowForgotModal(false)} 
      />
    </div>
  );
};

export default Login;