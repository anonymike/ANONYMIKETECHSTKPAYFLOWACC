import Link from 'next/link';
import { Home } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | ANONYMIKETECH',
  description: 'Terms of Service for ANONYMIKETECH Secure Payment Hub',
};

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the ANONYMIKETECH platform, you accept and agree to be bound by and comply with these Terms and Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on ANONYMIKETECH platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on ANONYMIKETECH platform are provided on an "as is" basis. ANONYMIKETECH makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p>
                In no event shall ANONYMIKETECH or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ANONYMIKETECH platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on ANONYMIKETECH platform could include technical, typographical, or photographic errors. ANONYMIKETECH does not warrant that any of the materials on the platform are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
              <p>
                ANONYMIKETECH has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ANONYMIKETECH of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p>
                ANONYMIKETECH may revise these terms of service for the platform at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@anonymiketech.online<br />
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
