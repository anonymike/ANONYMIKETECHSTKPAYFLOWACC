'use client';

import { Lock, Zap, Shield, BarChart3, Smartphone, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black/20 border-t border-white/10 text-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Choose ANONYMIKETECH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/20">
                  <Lock className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Bank-Level Security</h3>
                <p className="text-sm text-gray-400">Your transactions are protected with military-grade encryption</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500/20">
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Instant Transfers</h3>
                <p className="text-sm text-gray-400">Send money in seconds with our optimized payment system</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/20">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Verified Transactions</h3>
                <p className="text-sm text-gray-400">Every transaction is verified and encrypted for safety</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-orange-500/20">
                  <BarChart3 className="h-6 w-6 text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Detailed Analytics</h3>
                <p className="text-sm text-gray-400">Track all your transactions with detailed history and stats</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-pink-500/20">
                  <Smartphone className="h-6 w-6 text-pink-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Mobile Optimized</h3>
                <p className="text-sm text-gray-400">Seamless experience on any device, anytime, anywhere</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-500/20">
                  <Clock className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">24/7 Availability</h3>
                <p className="text-sm text-gray-400">Access your payment hub anytime you need it</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <p className="text-sm text-gray-400">ANONYMIKETECH is a secure payment hub providing instant money transfers and transaction management.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.anonymiketech.online" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white font-medium">
              &copy; 2026 ANONYMIKETECH. All rights reserved. | Secure Payment Hub
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
