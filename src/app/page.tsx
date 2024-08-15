"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mx-6">
      <header className="bg-white w-full">
        <nav className="max-w-7xl mx-auto my-3 bg-slate-800 rounded-lg px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">Flashcard AI</h1>
          <div>
            <Link href="/pricing" className="text-blue-600 hover:underline mr-4">
              Pricing
            </Link>
            <Link href="/tos" className="text-blue-600 hover:underline mr-4">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="text-blue-600 hover:underline mr-4">
              Refund Policy
            </Link>
            <Link href="/privacy-policy" className="text-blue-600 hover:underline mr-4">
              Privacy Policy
            </Link>
            {isSignedIn ? (
              <div className="flex align-middle items-center justify-center gap-2">
                <Link href="/dashboard" className="text-blue-600 bg-white p-2 rounded-lg">
                  Create Flashcards
                </Link>
                <span>
                  <UserButton />
                </span>
              </div>
            ) : (
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center mt-10 flex-grow text-center">
        <h2 className="text-3xl font-semibold text-white">
          Generate Flashcards Effortlessly
        </h2>
        <p className="mt-4 text-lg max-w-md text-white">
          Use our AI-powered tool to create flashcards from your notes and study materials in seconds!
        </p>

        <div className="mt-6">
          {isSignedIn ? (
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">
                Start Creating
              </button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">
                Get Started
              </button>
            </Link>
          )}
        </div>

        <section className="max-w-7xl mt-10 px-6 text-center">
          <h3 className="text-4xl font-semibold text-white">Features</h3>
          <ul className="mt-6 space-y-4 text-left max-w-2xl mx-auto">
            <li className="flex items-center text-white">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Create flashcards in seconds with our AI-powered tool.</span>
            </li>
            <li className="flex items-center text-white">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Study more effectively with our flashcards.</span>
            </li>
            <li className="flex items-center text-white">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Customize your flashcards to suit your study needs.</span>
            </li>
          </ul>
        </section>

        <section className="max-w-7xl mt-10 px-6 text-center">
          <h3 className="text-4xl font-semibold text-white">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 mx-auto">
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold text-white">Free Plan</h4>
              <p className="mt-4 text-white">
                <ul className="space-y-4 text-left max-w-md mx-auto">
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Upto 50 monthly flashcards generation</span>
                  </li>
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>5 Collections</span>
                  </li>
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>AI Flashcard Generation</span>
                  </li>
                  <li className="flex items-center text-white">
                    <ImCross className="text-red-500 mr-2" />
                    <span>No Priority support</span>
                  </li>
                </ul>
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 text-center">
              <h4 className="font-semibold text-white">
                <span className="font-xl">Pro Plan</span> <br />
                <span className="text-sm">$29/year</span>
              </h4>
              <p className="mt-4 text-white">
                <ul className="space-y-4 text-left max-w-md mx-auto">
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Unlimited flashcards</span>
                  </li>
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Advanced features</span>
                  </li>
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>No ads</span>
                  </li>
                  <li className="flex items-center text-white">
                    <FaCheckCircle className="text-green-400 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mt-10 mb-10 px-6 text-center">
          <h3 className="text-4xl font-semibold text-white">Contact Us</h3>
          <p className="mt-4 text-lg max-w-md mx-auto text-white">
            Have questions or feedback? Reach out to us at{" "}
            <a href="mailto:rishabhgupta4523@gmail.com" className="text-blue-400 hover:underline">
              rishabhgupta4523@gmail.com
            </a>
            . We're here to help!
          </p>
        </section>
      </main>

      <footer className="text-center my-2">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Flashcard AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
