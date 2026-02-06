import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | ANONYMIKETECH',
  description: 'Privacy policy for ANONYMIKETECH Secure Payment Hub',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg hover:text-gray-200 transition-colors">
            ANONYMIKETECH
          </Link>
          <Link href="https://www.anonymiketech.online" target="_blank" className="text-gray-300 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                ANONYMIKETECH ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our payment platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Phone numbers for payment processing</li>
                <li>Transaction history and payment information</li>
                <li>Device information and IP addresses</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your transactions</li>
                <li>Generate a personal profile about you</li>
                <li>Increase the efficiency and operation of the Site</li>
                <li>Monitor and analyze usage and trends to improve your experience</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclosure of Your Information</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By Law or to Protect Rights: If we believe the release of information is necessary to comply with the law</li>
                <li>Service Providers: We may share your information with third parties who perform services for us</li>
                <li>M-Pesa Integration: Payment information is shared with M-Pesa for transaction processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. However, despite our safeguards, no security system is impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> privacy@anonymiketech.online<br />
                <strong>Website:</strong> <a href="https://www.anonymiketech.online" className="text-blue-600 hover:underline">www.anonymiketech.online</a>
              </p>
            </section>
          </div>

          {/* Back to Dashboard */}
          <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
            <p className="text-gray-700 mb-4">Ready to manage your payments?</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
              <Home className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
