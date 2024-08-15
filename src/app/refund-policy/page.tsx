"use client"

import { FC } from 'react';
import Head from 'next/head';

const RefundPolicyPage: FC = () => {
  return (
    <>
      <Head>
        <title>Refund Policy - AI Flashcard SaaS</title>
        <meta name="description" content="Refund policy for AI Flashcard SaaS application" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <p className="mb-4">We offer a 7-day money-back guarantee for all subscriptions.</p>
        <p className="mb-4">
          If you are not satisfied with our service within the first 30 days, you can request a full refund by contacting our support team.
        </p>
        <p className="mb-4">
          To request a refund, please send an email to <a href="mailto:support@example.com" className="text-blue-500">rishabhgupta4523@gmail.com</a> with your order details.
        </p>
      </main>
    </>
  );
};

export default RefundPolicyPage;
