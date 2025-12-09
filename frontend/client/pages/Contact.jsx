import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            Have questions?  We'd love to hear from you. 
          </p>
          <p className="text-lg text-gray-600">
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;