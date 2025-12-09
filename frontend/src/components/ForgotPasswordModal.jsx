import { useState } from 'react';
import { X, Loader2, Mail } from 'lucide-react';
import { authApi } from '@/api/authApi';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/errorHandler';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.forgotPassword(email);
      
      setIsSuccess(true);
      toast({
        title: 'Success',
        description: 'Password reset link sent!  Please check your email.',
      });
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (! isLoading) {
      onClose();
      setEmail('');
      setIsSuccess(false);
    }
  };

  if (! isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {! isSuccess ? (
            <>
              <h2
                className="text-2xl font-bold text-[#44444E] mb-2"
                style={{ fontFamily:  'Roboto Mono' }}
              >
                Forgot Password?
              </h2>
              <p
                className="text-gray-600 text-sm mb-6"
                style={{ fontFamily:  'Noto Sans' }}
              >
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-[#666666] text-sm font-semibold mb-1.5"
                    style={{ fontFamily: 'Noto Sans' }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="reset-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:ring-2 focus:ring-[#29473E]/10 focus:outline-none transition-all text-gray-700 text-sm placeholder-gray-400"
                    placeholder="Enter your email"
                    style={{ fontFamily: 'Noto Sans' }}
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#29473E] text-white py-2.5 rounded-lg text-base font-medium hover: bg-[#1f3630] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Noto Sans' }}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3
                className="text-xl font-bold text-[#44444E] mb-2"
                style={{ fontFamily:  'Roboto Mono' }}
              >
                Check Your Email
              </h3>
              <p
                className="text-gray-600 text-sm"
                style={{ fontFamily: 'Noto Sans' }}
              >
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;