'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Settings as SettingsIcon, Lock, Smartphone, LogOut, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<'security' | 'account' | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+254');
  const [logoutCountdown, setLogoutCountdown] = useState<number | null>(null);
  const logoutIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecurityUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all password fields.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'New password and confirm password must match.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Your password has been updated successfully.',
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setActiveModal(null);
  };

  const handleAccountUpdate = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: 'Invalid Phone',
        description: 'Please enter a valid phone number.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Your account information has been updated.',
    });

    setActiveModal(null);
  };

  const handleLogout = () => {
    toast({
      title: 'Logging Out',
      description: 'You will be redirected shortly.',
    });
    
    // Start countdown
    setLogoutCountdown(3);
    if (logoutIntervalRef.current) clearInterval(logoutIntervalRef.current);

    let count = 3;
    logoutIntervalRef.current = setInterval(() => {
      count -= 1;
      setLogoutCountdown(count);

      if (count <= 0) {
        if (logoutIntervalRef.current) clearInterval(logoutIntervalRef.current);
        window.location.href = 'https://www.anonymiketech.online';
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (logoutIntervalRef.current) clearInterval(logoutIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg hover:text-gray-200 transition-colors flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Link>
          <div className="flex gap-3">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">Manage your account preferences and security</p>

          <div className="space-y-6">
            {/* Security Settings */}
            <section className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-green-100 rounded-lg h-fit">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Security</h3>
                    <p className="text-gray-600">Change your password to keep your account secure</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal('security')}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors font-semibold"
                >
                  Configure
                </button>
              </div>
            </section>

            {/* Account Settings */}
            <section className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg h-fit">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Account</h3>
                    <p className="text-gray-600">Update your profile information and phone number</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal('account')}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors font-semibold"
                >
                  Configure
                </button>
              </div>
            </section>

            {/* Logout Section */}
            <section className="border border-red-200 bg-red-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-red-100 rounded-lg h-fit">
                    <LogOut className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-1">Logout</h3>
                    <p className="text-red-700">Sign out from your account</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            </section>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a> or visit our <a href="/security" className="text-blue-600 hover:underline">security page</a> for more information.
            </p>
          </div>
        </div>
      </div>

      {/* Security Modal */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <p className="text-xs text-gray-600">Password must be at least 8 characters long.</p>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSecurityUpdate}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      {activeModal === 'account' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Update Account</h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="e.g., +254708374149"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              <p className="text-xs text-gray-600">Use format: +254XXXXXXXXX</p>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAccountUpdate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Countdown Animation */}
      {logoutCountdown !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm pointer-events-auto">
            <p className="text-gray-600 text-lg mb-6 font-medium">Redirecting in...</p>
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="absolute w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray={`${(logoutCountdown / 3) * 282.7}`}
                    strokeDashoffset="0"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="text-5xl font-bold text-blue-600 tabular-nums">{logoutCountdown}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">Taking you back to anonymiketech.online</p>
          </div>
        </div>
      )}
    </div>
  );
}
