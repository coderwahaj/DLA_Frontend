import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import RoleBasedComponent from "./RoleBasedComponent";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, user, logout } = useAuth();
  
  // Check if we're on login or signup page
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#29473E] shadow-md">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <img
            src="/logo.png"
            alt="Digital Legal Advisor Logo"
            className="w-[80px] sm:w-[100px] lg:w-[160px] h-[60px] sm:h-[70px] lg:h-[70px] object-contain"
          />
        </Link>

        {/* Desktop Navigation - Always hidden below xl when authenticated, below lg when not */}
        <nav className={`hidden ${isAuth ? 'xl:flex' : 'lg:flex'} items-center gap-4 xl:gap-8 bg-[#29473E] px-4 xl:px-10 py-4 rounded-[50px]`}>
          <Link
            to="/"
            className="text-white text-[20px] xl:text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-[20px] xl:text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            About
          </Link>
          <Link
            to="/platform"
            className="text-white text-[20px] xl: text-[24px] hover: opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Platform
          </Link>
          <Link
            to="/contact"
            className="text-white text-[20px] xl:text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Auth Buttons/User Menu */}
        <div className={`hidden ${isAuth ? 'xl:flex' : 'lg:flex'} items-center gap-2 xl:gap-4 flex-shrink-0`}>
          {isAuth ? (
            <>
              {/* Admin Dashboard Link - Only for Admins */}
              <RoleBasedComponent allowedRoles={['admin']}>
                <Link
                  to="/admin"
                  className="flex items-center gap-1. 5 px-3 xl:px-4 py-1. 5 bg-red-600 text-white rounded-lg text-[16px] xl:text-[18px] font-medium hover:bg-red-700 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  <Shield className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span className="hidden xl:inline">Admin</span>
                  <span className="xl:hidden">A</span>
                </Link>
              </RoleBasedComponent>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-1.5 px-3 xl:px-4 py-1.5 bg-transparent border-2 border-white text-white rounded-lg text-[16px] xl:text-[18px] font-medium hover: bg-white hover:text-[#29473E] transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
                style={{ fontFamily: "Ropa Sans" }}
              >
                <User className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="hidden xl:inline">Profile</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 xl:px-4 py-1.5 bg-white text-[#29473E] rounded-lg text-[16px] xl:text-[18px] font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
                style={{ fontFamily: "Ropa Sans" }}
              >
                <LogOut className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Show Login button only if NOT on login page */}
              {!isLoginPage && (
                <Link
                  to="/login"
                  className="px-4 xl:px-6 py-1.5 bg-transparent border-2 border-white text-white rounded-lg text-[18px] xl:text-[20px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  Login
                </Link>
              )}
              
              {/* Show SignUp button only if NOT on signup page */}
              {!isSignUpPage && (
                <Link
                  to="/signup"
                  className="px-4 xl:px-6 py-1.5 bg-white text-[#29473E] rounded-lg text-[18px] xl:text-[20px] font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg whitespace-nowrap"
                  style={{ fontFamily: "Ropa Sans" }}
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button - ALWAYS SHOW BELOW lg (not just when authenticated) */}
        <button
          className="lg:hidden text-white p-2 flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation - ALWAYS SHOW BELOW lg */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#29473E] border-t border-white/20 px-6 py-6 flex flex-col gap-6 max-h-[calc(100vh-70px)] overflow-y-auto">
          <Link
            to="/"
            className="text-white text-[20px] sm:text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-[20px] sm:text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/platform"
            className="text-white text-[20px] sm:text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Platform
          </Link>
          <Link
            to="/contact"
            className="text-white text-[20px] sm:text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile Auth Section */}
          {isAuth ?  (
            <div className="flex flex-col gap-3 mt-4 border-t border-white/20 pt-4">
              {/* User Info */}
              <div className="text-white text-[16px] sm:text-[18px] mb-2" style={{ fontFamily: "Ropa Sans" }}>
                <p className="font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm opacity-80 truncate">{user?.email}</p>
              </div>

              {/* Admin Dashboard - Mobile */}
              <RoleBasedComponent allowedRoles={['admin']}>
                <Link
                  to="/admin"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg text-[16px] sm:text-[18px] font-semibold hover:bg-red-700 transition-all duration-300 shadow-md"
                  style={{ fontFamily:  "Ropa Sans" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </Link>
              </RoleBasedComponent>

              {/* Profile - Mobile */}
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-transparent border-2 border-white text-white rounded-lg text-[16px] sm:text-[18px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300"
                style={{ fontFamily: "Ropa Sans" }}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                My Profile
              </Link>

              {/* Logout - Mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#29473E] rounded-lg text-[16px] sm:text-[18px] font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
                style={{ fontFamily: "Ropa Sans" }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {/* Mobile - Show Login button only if NOT on login page */}
              {!isLoginPage && (
                <Link
                  to="/login"
                  className="flex-1 px-5 py-3 bg-transparent border-2 border-white text-white rounded-lg text-[16px] sm:text-[18px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 text-center"
                  style={{ fontFamily: "Ropa Sans" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              
              {/* Mobile - Show SignUp button only if NOT on signup page */}
              {!isSignUpPage && (
                <Link
                  to="/signup"
                  className="flex-1 px-5 py-3 bg-white text-[#29473E] rounded-lg text-[16px] sm:text-[18px] font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md text-center"
                  style={{ fontFamily: "Ropa Sans" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;