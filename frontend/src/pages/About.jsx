import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About DLA</h1>
          <p className="text-lg text-gray-600 mb-4">
            Deep Learning Automation (DLA) is a revolutionary platform designed 
            to simplify the complex world of artificial intelligence and machine learning. 
          </p>
          <p className="text-lg text-gray-600">
            Our mission is to make deep learning accessible to everyone, from 
            researchers to enterprises. 
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;