// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { Menu, X } from "lucide-react";

// // const Header = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 bg-[#29473E] shadow-md">
// //       <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 h-[145px] flex items-center justify-between">
// //         {/* Logo */}
// //         <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
// //           <img
// //             src="/logo.png"
// //             alt="Digital Legal Advisor Logo"
// //             className="w-[120px] lg:w-[153px] h-auto object-contain"
// //           />
// //         </Link>

// //         {/* Desktop Navigation */}
// //         <nav className="hidden lg:flex items-center gap-8 bg-[#29473E] px-12 py-6 rounded-[50px]">
// //           <Link
// //             to="/"
// //             className="text-white text-[28px] lg:text-[32px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             to="/about"
// //             className="text-white text-[28px] lg:text-[32px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             About
// //           </Link>
// //           <Link
// //             to="/platform"
// //             className="text-white text-[28px] lg:text-[32px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             Platform
// //           </Link>
// //           <Link
// //             to="/contact"
// //             className="text-white text-[28px] lg:text-[32px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             Contact Us
// //           </Link>
// //         </nav>

// //         {/* Desktop Auth Buttons */}
// //         <div className="hidden lg:flex items-center gap-4">
// //           <button
// //             className="px-6 py-3 bg-white text-[#5D866C] rounded-[5px] text-[28px] hover:opacity-90 transition-all"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             Login
// //           </button>
// //           <button
// //             className="px-6 py-3 bg-white text-[#5D866C] rounded-[5px] text-[28px] hover:opacity-90 transition-all"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //           >
// //             SignUp
// //           </button>
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <button
// //           className="lg:hidden text-white p-2"
// //           onClick={() => setIsMenuOpen(!isMenuOpen)}
// //           aria-label="Toggle menu"
// //         >
// //           {isMenuOpen ?  <X size={32} /> : <Menu size={32} />}
// //         </button>
// //       </div>

// //       {/* Mobile Navigation */}
// //       {isMenuOpen && (
// //         <div className="lg:hidden bg-[#29473E] border-t border-white/20 px-6 py-6 flex flex-col gap-6">
// //           <Link
// //             to="/"
// //             className="text-white text-[24px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             to="/about"
// //             className="text-white text-[24px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             About
// //           </Link>
// //           <Link
// //             to="/platform"
// //             className="text-white text-[24px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             Platform
// //           </Link>
// //           <Link
// //             to="/contact"
// //             className="text-white text-[24px] hover:opacity-80 transition-opacity"
// //             style={{ fontFamily: 'Ropa Sans' }}
// //             onClick={() => setIsMenuOpen(false)}
// //           >
// //             Contact Us
// //           </Link>
// //           <div className="flex gap-3 mt-4">
// //             <button
// //               className="flex-1 px-4 py-3 bg-white text-[#5D866C] rounded-[5px] text-[20px]"
// //               style={{ fontFamily: 'Ropa Sans' }}
// //             >
// //               Login
// //             </button>
// //             <button
// //               className="flex-1 px-4 py-3 bg-white text-[#5D866C] rounded-[5px] text-[20px]"
// //               style={{ fontFamily: 'Ropa Sans' }}
// //             >
// //               SignUp
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-[#29473E] shadow-md">
//       <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 h-[95px] flex items-center justify-between">
//         {/* Logo - Bigger Size */}
//         <Link
//           to="/"
//           className="flex items-center hover:opacity-90 transition-opacity"
//         >
//           <img
//             src="/logo.png"
//             alt="Digital Legal Advisor Logo"
//             className="w-[100px] lg:w-[160px] h-[90px] lg:h-[90px] object-contain"
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-8 bg-[#29473E] px-10 py-4 rounded-[50px]">
//           <Link
//             to="/"
//             className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             About
//           </Link>
//           <Link
//             to="/platform"
//             className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             Platform
//           </Link>
//           <Link
//             to="/contact"
//             className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             Contact Us
//           </Link>
//         </nav>

//         {/* Desktop Auth Buttons - Modern Design */}
//         <div className="hidden lg:flex items-center gap-4">
//           <Link
//             to="/login"
//             className="px-6 py-1.5 bg-transparent border-2 border-white text-white rounded-lg text-[20px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="px-5 py-1.5 bg-white text-[#29473E] rounded-lg text-[20px] font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg whitespace-nowrap"
//             style={{ fontFamily: "Ropa Sans" }}
//           >
//             Sign Up
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden text-white p-2"
//           onClick={() => setIsMenuOpen(! isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-[#29473E] border-t border-white/20 px-6 py-6 flex flex-col gap-6">
//           <Link
//             to="/"
//             className="text-white text-[22px] hover:opacity-80 transition-opacity"
//             style={{ fontFamily: "Ropa Sans" }}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about"
//             className="text-white text-[22px] hover:opacity-80 transition-opacity"
//             style={{ fontFamily: "Ropa Sans" }}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             About
//           </Link>
//           <Link
//             to="/platform"
//             className="text-white text-[22px] hover:opacity-80 transition-opacity"
//             style={{ fontFamily: "Ropa Sans" }}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Platform
//           </Link>
//           <Link
//             to="/contact"
//             className="text-white text-[22px] hover:opacity-80 transition-opacity"
//             style={{ fontFamily: "Ropa Sans" }}
//             onClick={() => setIsMenuOpen(false)}
//           >
//             Contact Us
//           </Link>
//           <div className="flex gap-3 mt-4">
//             <Link
//               to="/login"
//               className="flex-1 px-5 py-3 bg-transparent border-2 border-white text-white rounded-lg text-[18px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 text-center"
//               style={{ fontFamily: "Ropa Sans" }}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="flex-1 px-5 py-3 bg-white text-[#29473E] rounded-lg text-[18px] font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md text-center"
//               style={{ fontFamily: "Ropa Sans" }}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;


import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on login or signup page
  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#29473E] shadow-md">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-20 h-[70px] flex items-center justify-between">
        {/* Logo - Bigger Size */}
        <Link
          to="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Digital Legal Advisor Logo"
            className="w-[100px] lg:w-[160px] h-[90px] lg:h-[70px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 bg-[#29473E] px-10 py-4 rounded-[50px]">
          <Link
            to="/"
            className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            About
          </Link>
          <Link
            to="/platform"
            className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Platform
          </Link>
          <Link
            to="/contact"
            className="text-white text-[24px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ fontFamily: "Ropa Sans" }}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Auth Buttons - Conditional */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Show Login button only if NOT on login page */}
          {!isLoginPage && (
            <Link
              to="/login"
              className="px-6 py-1.5 bg-transparent border-2 border-white text-white rounded-lg text-[20px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md whitespace-nowrap"
              style={{ fontFamily: "Ropa Sans" }}
            >
              Login
            </Link>
          )}
          
          {/* Show SignUp button only if NOT on signup page */}
          {!isSignUpPage && (
            <Link
              to="/signup"
              className="px-6 py-1.5 bg-white text-[#29473E] rounded-lg text-[20px] font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg whitespace-nowrap"
              style={{ fontFamily: "Ropa Sans" }}
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#29473E] border-t border-white/20 px-6 py-6 flex flex-col gap-6">
          <Link
            to="/"
            className="text-white text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/platform"
            className="text-white text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Platform
          </Link>
          <Link
            to="/contact"
            className="text-white text-[22px] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "Ropa Sans" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <div className="flex gap-3 mt-4">
            {/* Mobile - Show Login button only if NOT on login page */}
            {!isLoginPage && (
              <Link
                to="/login"
                className="flex-1 px-5 py-3 bg-transparent border-2 border-white text-white rounded-lg text-[18px] font-medium hover:bg-white hover:text-[#29473E] transition-all duration-300 text-center"
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
                className="flex-1 px-5 py-3 bg-white text-[#29473E] rounded-lg text-[18px] font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md text-center"
                style={{ fontFamily: "Ropa Sans" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;