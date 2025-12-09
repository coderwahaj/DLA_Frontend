import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
    // Add your password reset logic here
    alert(`Password reset link sent to ${email}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="relative w-[360px] bg-white rounded-lg shadow-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Back Arrow */}
          <div className="flex items-center mb-6">
            <button
              onClick={onClose}
              className="mr-3 text-[#111827] hover:text-[#29473E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2
              className="text-[18px] font-bold text-[#29473E]"
              style={{ fontFamily: "Roboto" }}
            >
              Reset your password
            </h2>
          </div>

          {/* Description */}
          <p
            className="text-[14px] text-[#111827] leading-5 mb-5"
            style={{ fontFamily: "Roboto" }}
          >
            We will send you an email to reset your password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Label */}
            <label
              htmlFor="reset-email"
              className="block text-[12px] font-semibold text-[#111827] mb-2"
              style={{ fontFamily: "Roboto" }}
            >
              Email
            </label>

            {/* Email Input */}
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded text-sm text-gray-700 focus:outline-none focus:border-[#29473E] focus:ring-1 focus:ring-[#29473E] transition-all mb-5"
              placeholder="Enter your email"
              style={{ fontFamily: "Roboto" }}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#29473E] text-white py-2 rounded text-[14px] font-semibold hover:bg-[#1f3630] transition-all duration-300"
              style={{ fontFamily: "Roboto" }}
            >
              Email me
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;