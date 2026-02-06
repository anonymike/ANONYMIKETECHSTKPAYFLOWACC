import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | ANONYMIKETECH',
  description: 'Cookie Policy for ANONYMIKETECH Secure Payment Hub',
};

export default function CookiePolicy() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small pieces of data stored on your device (computer, smartphone, or tablet) that contain information about your browsing habits. They help us remember your preferences and improve your experience on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              <p>We use the following types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> These temporary cookies expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> These remain on your device until you delete them</li>
                <li><strong>Analytics Cookies:</strong> These help us understand how you use our platform</li>
                <li><strong>Security Cookies:</strong> These protect against fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your login information</li>
                <li>Understand your preferences and browsing patterns</li>
                <li>Improve platform functionality and user experience</li>
                <li>Detect and prevent fraud</li>
                <li>Analyze traffic and usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Your Cookies</h2>
              <p>
                You can control cookie settings through your browser. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking cookies may affect your ability to use certain features of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Cookies</h2>
              <p>
                Our platform may contain links to third-party websites that use their own cookies. We are not responsible for the cookie practices of third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p>
                For questions about our cookie practices, please contact us at:
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
