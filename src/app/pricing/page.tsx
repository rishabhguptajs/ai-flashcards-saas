"use client"

import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PricingPage: FC = () => {
  return (
    <>
      <Head>
        <title>Pricing - AI Flashcard SaaS</title>
        <meta name="description" content="Pricing for AI Flashcard SaaS application" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="mb-4">Choose a plan that fits your needs.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Basic Plan</h2>
            <p className="text-lg mb-2">$0/month</p>
            <ul className="mb-4">
              <li>Up to 50 flashcards</li>
              <li>5 collections</li>
              <li>10 flashcards per collection</li>
            </ul>
            <Link href="/sign-in">
              <span className="text-blue-500">Sign Up</span>
            </Link>
          </div>
          <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
            <p className="text-lg mb-2">$29.99/year</p>
            <ul className="mb-4">
              <li>Unlimited flashcards</li>
              <li>Unlimited collections</li>
              <li>Advanced features</li>
            </ul>
            <Link href="/sign-in">
              <span className="text-blue-500">Sign Up</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default PricingPage;
