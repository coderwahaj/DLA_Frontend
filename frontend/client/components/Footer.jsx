import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#29473E] py-5 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-start items-start gap-8 md:gap-20 lg:gap-32 mb-8">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Digital Legal Advisor Logo" 
              className="w-[180px] md:w-[200px] lg:w-[226px] h-auto object-contain"
            />
          </div>

          {/* Company and Support - Close Together */}
          <div className="flex gap-12 md:gap-16 lg:gap-20">
            {/* Company Section */}
            <div>
              <h4 className="text-white text-[20px] md:text-[22px] lg:text-[24px] font-normal mb-6"
                  style={{ fontFamily: 'Ropa Sans' }}>
                Company
              </h4>
              
              <div className="flex flex-col gap-4">
                <Link 
                  to="/" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Home
                </Link>
                <Link 
                  to="/features" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Features
                </Link>
                <Link 
                  to="/plans" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Plans
                </Link>
                <Link 
                  to="/about" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="text-white text-[20px] md:text-[22px] lg:text-[24px] font-normal mb-6"
                  style={{ fontFamily: 'Ropa Sans' }}>
                Support
              </h4>
              
              <div className="flex flex-col gap-4">
                <Link 
                  to="/faqs" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  FAQs
                </Link>
                <Link 
                  to="/help" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Help Center
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white text-[16px] md:text-[18px] lg:text-[20px] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Ropa Sans' }}
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Centered at Bottom */}
        <div className="border-t border-white/20 pt-6 mt-8">
          <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] text-center"
             style={{ fontFamily: 'Ropa Sans' }}>
            Copyright © 2025 @ FAST NUCES LAHORE F25-028
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;