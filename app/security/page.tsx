import Link from 'next/link';
import { Lock, Smartphone, Shield, Key, AlertCircle, Home } from 'lucide-react';

export const metadata = {
  title: 'Security | ANONYMIKETECH',
  description: 'Security practices and information for ANONYMIKETECH Secure Payment Hub',
};

export default function Security() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Security</h1>
          <p className="text-gray-600 mb-8">Your safety and privacy are our top priorities</p>

          <div className="space-y-8">
            {/* Security Features */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <Lock className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
                  <p className="text-gray-700">
                    All your transactions and personal information are encrypted using industry-standard encryption protocols to protect against unauthorized access.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
                  <p className="text-gray-700">
                    We implement the same security standards used by major financial institutions to safeguard your data and transactions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Key className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Authentication</h3>
                  <p className="text-gray-700">
                    Multi-factor authentication and secure session management ensure only authorized users access their accounts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Smartphone className="w-8 h-8 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">M-Pesa Integration</h3>
                  <p className="text-gray-700">
                    Secure integration with M-Pesa's trusted payment gateway ensures your financial transactions are protected.
                  </p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <h2 className="text-2xl font-bold text-gray-900">Security Best Practices</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Never share your password or PIN with anyone</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Always use secure and private networks for transactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Keep your device software and security apps up to date</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Review your transaction history regularly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Report any suspicious activity immediately</span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Concerns?</h2>
              <p className="text-gray-700 mb-4">
                If you have any security concerns or discover a vulnerability, please contact us immediately at:
              </p>
              <p>
                <strong>Security Email:</strong> <a href="mailto:security@anonymiketech.online" className="text-blue-600 hover:underline">security@anonymiketech.online</a><br />
                <strong>Website:</strong> <a href="https://www.anonymiketech.online" className="text-blue-600 hover:underline">www.anonymiketech.online</a>
              </p>
            </section>

            {/* Back to Dashboard */}
            <section className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
              <p className="text-gray-700 mb-4">Ready to manage your payments securely?</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                <Home className="w-5 h-5" />
                Back to Dashboard
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
