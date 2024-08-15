import { NextPage } from 'next';
import Head from 'next/head';
import { FC } from 'react';

const PrivacyPolicy: FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | AI Flashcards</title>
        <meta name="description" content="Privacy Policy for AI Flashcards" />
      </Head>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">Effective Date: 16/08/2024</p>
        <p className="mb-4">
          <strong>AI Flashcards</strong> ("we", "us", "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application AI Flashcards ("App"). Please read this policy carefully.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us when you use our App, including:
          <ul className="list-disc list-inside ml-4">
            <li><strong>Personal Information:</strong> Such as your name, email address, and any other details you provide when you register or use our services.</li>
          </ul>
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
          <ul className="list-disc list-inside ml-4">
            <li>Provide, maintain, and improve our App and services.</li>
            <li>Respond to your comments, questions, and requests.</li>
            <li>Communicate with you, including sending updates and promotional materials.</li>
            <li>Ensure the security and integrity of our App.</li>
          </ul>
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
          <ul className="list-disc list-inside ml-4">
            <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our App and providing services to you. These providers are contractually obligated to protect your information and use it only for the purposes we specify.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to legal processes or requests from governmental authorities.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
          </ul>
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">4. Data Security</h2>
        <p className="mb-4">
          We use industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">5. Your Choices</h2>
        <p className="mb-4">
          You can:
          <ul className="list-disc list-inside ml-4">
            <li><strong>Access and Update Your Information:</strong> You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us.</li>
            <li><strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us by following the instructions in those communications or by contacting us directly.</li>
          </ul>
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">6. Children’s Privacy</h2>
        <p className="mb-4">
          Our App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">7. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our App and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> rishabhgupta4523@gmail.com
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
