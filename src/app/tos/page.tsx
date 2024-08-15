"use client"
import { FC } from 'react';

const TermsOfService: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
      </header>
      <section className="prose lg:prose-xl mx-auto">
        <p>Welcome to our service. By using our service, you agree to the following terms and conditions:</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing or using our service, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.</p>

        <h2>Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Changes will be effective when posted on this page. Your continued use of the service after any changes indicates your acceptance of the updated terms.</p>

        <h2>Usage Restrictions</h2>
        <p>You agree not to use our service for any unlawful or prohibited activities. This includes but is not limited to, transmitting malware, unauthorized access to other systems, or violating intellectual property rights.</p>

        <h2>Limitation of Liability</h2>
        <p>Our liability for any damages arising out of or related to your use of our service is limited to the fullest extent permitted by law. We are not liable for indirect, incidental, or consequential damages.</p>

        <h2>Contact Information</h2>
        <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@example.com" className="text-blue-500">rishabhgupta4523@gmail.com</a>.</p>
      </section>
    </div>
  );
};

export default TermsOfService;
