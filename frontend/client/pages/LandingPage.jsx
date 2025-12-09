
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="relative w-full bg-white overflow-x-hidden">
      <Header />

      {/* Section 1 - Hero */}
      <section className="relative w-full min-h-[557px] mt-[65px] bg-white px-6 md:px-12 lg:px-20 py-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 w-full lg:max-w-[554px]">
            <h1
              className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight text-[#29473E] mb-6"
              style={{ fontFamily: "Roboto" }}
            >
              Digital Legal Advisor — Your AI Powered Legal Companion
            </h1>
            <p
              className="text-[18px] md:text-[20px] lg:text-[24px] leading-relaxed text-[#44444E]"
              style={{ fontFamily: "Roboto Mono" }}
            >
              Empowering citizens and legal professionals with instant,
              reliable, and simplified legal guidance, anytime, anywhere. From
              understanding legal documents to researching case precedents, our
              AI chatbot ensures clarity, accuracy, and accessibility for all.
            </p>
          </div>

          {/* Hero Image */}
          <div
            className="flex-1 w-full lg:max-w-[554px] h-[300px] md:h-[400px] lg:h-[462px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url(/hero.png)" }}
          />
        </div>
      </section>

      {/* Section 2 - What is DLA */}
      <section className="relative w-full min-h-[557px] bg-white px-6 md:px-12 lg:px-20 py-12 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Courtroom Image */}
          <div
            className="flex-1 w-full lg:max-w-[554px] h-[300px] md:h-[400px] lg:h-[462px] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url(/courtroom.png)" }}
          />

          {/* Right Content */}
          <div className="flex-1 w-full lg:max-w-[573px]">
            <h2
              className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight text-[#29473E] mb-6"
              style={{ fontFamily: "Roboto" }}
            >
              What is Digital Legal Advisor?
            </h2>
            <p
              className="text-[18px] md:text-[20px] lg:text-[24px] leading-relaxed text-[#44444E]"
              style={{ fontFamily: "Roboto Mono" }}
            >
              Digital Legal Advisor is an AI-powered platform that offers quick,
              reliable guidance on Pakistani financial laws. It simplifies
              complex legal documents, retrieves relevant case precedents, and
              provides clear answers to legal queries—making legal assistance
              accessible and easy to understand for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - Who is it for */}
      <section className="relative w-full min-h-[450px] bg-[#29473E] px-6 md:px-12 py-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <h2
            className="text-[24px] md:text-[28px] lg:text-[32px] font-extrabold leading-tight text-white text-center mb-12"
            style={{ fontFamily: "Roboto" }}
          >
            Who is Digital Legal Advisor for?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {/* Frame 1 - Citizens */}
            <div className="w-full max-w-[300px] min-h-[234px] bg-white rounded-[50px] p-8 flex flex-col items-center">
              <h3
                className="text-[20px] md:text-[22px] font-bold leading-tight text-[#5D866C] text-center mb-4"
                style={{ fontFamily: "Roboto Flex" }}
              >
                Citizens
              </h3>
              <p
                className="text-[16px] md:text-[18px] font-light leading-snug text-[#56565B] text-center"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Everyday individuals seeking legal solutions or quick insights
                for personal matters
              </p>
            </div>

            {/* Frame 2 - Law Students */}
            <div className="w-full max-w-[300px] min-h-[234px] bg-white rounded-[50px] p-8 flex flex-col items-center">
              <h3
                className="text-[20px] md:text-[22px] font-bold leading-tight text-[#5D866C] text-center mb-4"
                style={{ fontFamily: "Roboto Flex" }}
              >
                Law Students
              </h3>
              <p
                className="text-[16px] md:text-[18px] font-light leading-snug text-[#56565B] text-center"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Students aiming to bridge academic theory with practical legal
                application
              </p>
            </div>

            {/* Frame 3 - Legal Professionals */}
            <div className="w-full max-w-[300px] min-h-[234px] bg-white rounded-[50px] p-8 flex flex-col items-center">
              <h3
                className="text-[20px] md:text-[22px] font-bold leading-tight text-[#5D866C] text-center mb-4"
                style={{ fontFamily: "Roboto Flex" }}
              >
                Legal Professionals
              </h3>
              <p
                className="text-[16px] md:text-[18px] font-light leading-snug text-[#56565B] text-center"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Lawyers and paralegals seeking to streamline research and
                automate drafting.
              </p>
            </div>

            {/* Frame 4 - Law Firms */}
            <div className="w-full max-w-[300px] min-h-[228px] bg-white rounded-[50px] p-8 flex flex-col items-center">
              <h3
                className="text-[20px] md:text-[22px] font-bold leading-tight text-[#5D866C] text-center mb-4"
                style={{ fontFamily: "Roboto Flex" }}
              >
                Law Firms
              </h3>
              <p
                className="text-[16px] md:text-[18px] font-light leading-snug text-[#56565B] text-center"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Firms leveraging AI to enhance team efficiency and document
                automation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Why Choose */}
      <section className="relative w-full min-h-[450px] px-6 md:px-12 lg:px-20 py-16 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <h2
            className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-tight text-[#29473E] text-center mb-12"
            style={{ fontFamily: "Roboto" }}
          >
            Why choose Digital Legal Advisor?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Feature 1 */}
            <div>
              <h3
                className="text-[20px] md:text-[24px] font-bold leading-tight text-[#29473E] mb-3"
                style={{ fontFamily: "Roboto" }}
              >
                1. AI-Powered Legal Guidance
              </h3>
              <p
                className="text-[16px] md:text-[20px] font-light leading-snug text-[#56565B]"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Get accurate and instant answers to your legal questions with an
                intelligent chatbot trained on Pakistani financial laws.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <h3
                className="text-[20px] md:text-[24px] font-bold leading-tight text-[#29473E] mb-3"
                style={{ fontFamily: "Roboto" }}
              >
                2. Simplified Legal Language
              </h3>
              <p
                className="text-[16px] md:text-[20px] font-light leading-snug text-[#56565B]"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Understand complex legal documents through clear, easy-to-read
                summaries.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <h3
                className="text-[20px] md:text-[24px] font-bold leading-tight text-[#29473E] mb-3"
                style={{ fontFamily: "Roboto" }}
              >
                3. Secure and Reliable
              </h3>
              <p
                className="text-[16px] md:text-[20px] font-light leading-snug text-[#56565B]"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                Your data and documents are protected with strong encryption and
                privacy safeguards.
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <h3
                className="text-[20px] md:text-[24px] font-bold leading-tight text-[#29473E] mb-3"
                style={{ fontFamily: "Roboto" }}
              >
                4. Designed for Everyone
              </h3>
              <p
                className="text-[16px] md:text-[20px] font-light leading-snug text-[#56565B]"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                An intuitive interface that makes legal assistance accessible to
                both citizens and professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
