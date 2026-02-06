import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Home } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | ANONYMIKETECH',
  description: 'Contact ANONYMIKETECH Secure Payment Hub for support and inquiries',
};

export default function Contact() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">We're here to help and answer any question you might have</p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:support@anonymiketech.online" className="text-blue-600 hover:underline">support@anonymiketech.online</a>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone & WhatsApp</h3>
                  <p className="text-gray-700">
                    <a href="tel:+254782829321" className="text-blue-600 hover:underline">+254 782 829 321</a>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <a href="https://wa.me/254782829321" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Chat on WhatsApp</a>
                  </p>
                  <p className="text-sm text-gray-600">Available 24/7 for urgent inquiries</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 3:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Office Location</h3>
                  <p className="text-gray-700">Nairobi, Kenya</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <a href="https://www.anonymiketech.online" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit our website for full address</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Department Contacts</h3>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm text-gray-600">Technical Support</p>
                <p className="font-semibold text-gray-900">tech@anonymiketech.online</p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-sm text-gray-600">Sales & Partnerships</p>
                <p className="font-semibold text-gray-900">sales@anonymiketech.online</p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-sm text-gray-600">Security Issues</p>
                <p className="font-semibold text-gray-900">security@anonymiketech.online</p>
              </div>

              <div className="border-l-4 border-pink-600 pl-4">
                <p className="text-sm text-gray-600">Privacy & Legal</p>
                <p className="font-semibold text-gray-900">legal@anonymiketech.online</p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <p className="text-sm text-gray-600">General Inquiries</p>
                <p className="font-semibold text-gray-900">info@anonymiketech.online</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
            <p className="text-gray-700 mb-4">Follow us on our social media channels for updates and support:</p>
            <div className="flex gap-4 flex-wrap">
              <a href="https://www.anonymiketech.online" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Website
              </a>
              <a href="https://www.anonymiketech.online" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Social Media
              </a>
            </div>
          </section>

          {/* Back to Dashboard */}
          <section className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
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
