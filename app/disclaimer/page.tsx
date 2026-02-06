import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | ANONYMIKETECH',
  description: 'Disclaimer for ANONYMIKETECH Secure Payment Hub',
};

export default function Disclaimer() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Disclaimer</h2>
              <p>
                The information provided on the ANONYMIKETECH platform is for informational purposes only and should not be construed as professional financial or legal advice. We make no representations or warranties of any kind regarding the accuracy, completeness, or reliability of the information provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. No Warranty</h2>
              <p>
                The ANONYMIKETECH platform and all materials, information, and services provided on or through the platform are provided "as is" and "as available" without warranty of any kind, express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Limitation of Liability</h2>
              <p>
                In no event shall ANONYMIKETECH be liable to you or any third party for any direct, indirect, incidental, special, punitive, or consequential damages, including but not limited to damages for lost profits, goodwill, use, data, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. External Links</h2>
              <p>
                Our platform may contain links to external websites. We are not responsible for the content, accuracy, or practices of these external sites. Your use of external sites is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p>
                ANONYMIKETECH may utilize third-party services (such as M-Pesa for payment processing) to provide functionality. We are not responsible for the actions, omissions, or services provided by these third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Responsibility</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p>
                ANONYMIKETECH reserves the right to modify or discontinue the platform at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
              <p>
                For questions about this disclaimer, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> legal@anonymiketech.online<br />
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
