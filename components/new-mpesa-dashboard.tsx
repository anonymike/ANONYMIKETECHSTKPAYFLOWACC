'use client';

import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MpesaForm } from './mpesa-form';
import { PaymentStatusPoller } from './payment-status-poller';
import { RequestPaymentModal } from './request-payment-modal';
import { TransactionHistory } from './transaction-history';
import { Footer } from './footer';
import { Send, Settings, LogOut, Globe, Menu, X, TrendingUp } from 'lucide-react';

export function NewMpesaDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRequestPaymentModal, setShowRequestPaymentModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('Welcome');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutCountdown, setLogoutCountdown] = useState<number | null>(null);
  const logoutIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [userPhone, setUserPhone] = useState('+254708374149');
  const [logoutTimeout, setLogoutTimeout] = useState<NodeJS.Timeout | null>(null);

  // Update time and greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else if (hour < 21) setGreeting('Good Evening');
      else setGreeting('Good Night');

      const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(time);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
    const timeout = setTimeout(() => confirmLogout(), 15000);
    setLogoutTimeout(timeout);
  };

  const confirmLogout = () => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    setShowLogoutConfirm(false);
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

  const handleCancelLogout = () => {
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
      setLogoutTimeout(null);
    }
    setShowLogoutConfirm(false);
  };

  const handlePaymentSuccess = (checkoutRequestId: string, amount: number, phone: string) => {
    // Update the userPhone when a transaction is successfully made
    if (phone) {
      setUserPhone(phone);
      console.log('[v0] Updated userPhone after successful payment:', phone);
    }
  };

  const handlePhoneUpdate = (phone: string) => {
    // Update userPhone when user enters their phone number in the form
    if (phone && phone.length === 13 && phone.startsWith('+254')) {
      setUserPhone(phone);
      console.log('[v0] Updated userPhone from form:', phone);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur sticky top-0 z-40 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">ANONYMIKETECH</div>
                  <div className="text-xs text-green-400">Secure Payment Hub</div>
                </div>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-4">
                <a
                  href="https://www.anonymiketech.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white transition-colors rounded hover:bg-white/10"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <a
                  href="/settings"
                  className="p-2 text-gray-200 hover:text-white transition-colors rounded hover:bg-white/10 flex items-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm hidden lg:inline">Settings</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors rounded hover:bg-red-500/20"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu */}
              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="md:hidden p-2 text-gray-200 hover:text-white transition-colors"
              >
                {navbarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {navbarOpen && (
              <div className="md:hidden border-t border-white/10 py-4 space-y-2 bg-black/20">
                <a
                  href="https://www.anonymiketech.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white transition-colors rounded hover:bg-white/10"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <a
                  href="/settings"
                  onClick={() => setNavbarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white transition-colors rounded hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                    setNavbarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors rounded hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-200 hover:text-white">
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden text-xs">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="send" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-200 hover:text-white">
                <span className="hidden sm:inline">Send Money</span>
                <span className="sm:hidden text-xs">Send</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-200 hover:text-white">
                <span className="hidden sm:inline">History</span>
                <span className="sm:hidden text-xs">History</span>
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Card */}
                <div className="lg:col-span-2">
                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-3xl">{greeting}!</CardTitle>
                      <CardDescription className="text-green-100">Manage your payments with ease</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-200 text-sm">Quick Tips</p>
                          <p className="text-lg font-semibold">Check transaction history anytime</p>
                        </div>
                        <p className="text-green-100 text-right text-sm">{currentTime}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setActiveTab('send')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Money
                  </Button>
                  <Button
                    onClick={() => setShowRequestPaymentModal(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-2 font-semibold"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Request Payment
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50/40 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-900">System Active</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">99.9%</p>
                    <p className="text-xs text-blue-700 mt-1">System uptime</p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50/40 border-emerald-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-emerald-900">Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-emerald-600">0</p>
                    <p className="text-xs text-emerald-700 mt-1">All time</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50/40 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-900">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-purple-600">100%</p>
                    <p className="text-xs text-purple-700 mt-1">Payment success</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Send Money Tab */}
            <TabsContent value="send" className="space-y-4">
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <MpesaForm userPhone={userPhone} onSuccess={handlePaymentSuccess} onPhoneUpdate={handlePhoneUpdate} />
                </div>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <TransactionHistory userPhone={userPhone} />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Logout Countdown */}
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

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={handleCancelLogout} />
          <Card className="border w-full max-w-sm shadow-2xl relative z-10">
            <CardHeader>
              <CardTitle className="text-foreground">Confirm Logout</CardTitle>
              <CardDescription className="text-muted-foreground">You will be redirected to the main website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to logout? You will be taken back to https://www.anonymiketech.online
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleCancelLogout}>
                  Cancel
                </Button>
                <Button onClick={confirmLogout} className="bg-destructive hover:bg-red-700 text-white font-semibold">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request Payment Modal */}
      {showRequestPaymentModal && (
        <RequestPaymentModal isOpen={showRequestPaymentModal} onClose={() => setShowRequestPaymentModal(false)} />
      )}

      {/* Footer */}
      <Footer />
    </>
  );
}
