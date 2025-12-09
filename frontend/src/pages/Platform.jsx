import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function Platform() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-legal-light">
        <div className="text-center px-6 py-24">
          <h1 className="text-4xl font-bold text-legal-text mb-4">Platform</h1>
          <p className="text-legal-text-light mb-8 max-w-2xl">
            This page is under construction. Continue prompting to add content
            here.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-legal-dark text-white rounded hover:bg-legal-dark/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
