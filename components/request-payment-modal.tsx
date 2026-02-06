'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Copy, Check, Share2, Link as LinkIcon, QrCode, AlertCircle } from 'lucide-react';
import { QRCodeGenerator } from './qr-code-generator';
import { useToast } from '@/hooks/use-toast';

interface RequestPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestPaymentModal({ isOpen, onClose }: RequestPaymentModalProps) {
  const { toast } = useToast();
  const [recipientPhone, setRecipientPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'link' | 'qr'>('form');
  const [useQRCode, setUseQRCode] = useState(false);

  const generatePaymentLink = () => {
    if (!recipientPhone || !amount) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both phone number and amount to continue.',
        variant: 'destructive',
      });
      return;
    }

    // Generate a unique payment request ID
    const requestId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Use window.location.origin for production URLs, with fallback to env var or localhost
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    
    const link = `${baseUrl}/pay?id=${requestId}&phone=${encodeURIComponent(recipientPhone)}&amount=${amount}&desc=${encodeURIComponent(description)}`;

    setPaymentLink(link);
    setStep(useQRCode ? 'qr' : 'link');
    
    toast({
      title: 'Payment Link Generated',
      description: `Payment request for KES ${amount} created successfully.`,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: 'Copied to Clipboard',
      description: 'Payment link has been copied to your clipboard.',
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Payment Request',
        text: `Payment request for KES ${amount}${description ? ': ' + description : ''}`,
        url: paymentLink,
      });
    } else {
      copyToClipboard();
    }
  };

  const resetForm = () => {
    setRecipientPhone('');
    setAmount('');
    setDescription('');
    setPaymentLink('');
    setStep('form');
    setUseQRCode(false);
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur z-40 transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="border w-full max-w-md shadow-xl bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/40 backdrop-blur-sm border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-foreground flex items-center gap-2">
                {step === 'qr' ? (
                  <>
                    <QrCode className="w-5 h-5 text-primary" />
                    Payment QR Code
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 text-primary" />
                    Request Payment
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {step === 'form' ? 'Generate a shareable payment link' : step === 'qr' ? 'Share via QR code' : 'Share your payment request'}
              </CardDescription>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-muted rounded transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </CardHeader>

          <CardContent>
            {step === 'form' ? (
              <div className="space-y-4">
                {/* Recipient Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Recipient Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+254712345678"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="border-border"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Amount (KES)</label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    max="999999"
                    className="border-border"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Description (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Payment for services"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-border"
                  />
                </div>

                {/* QR Code Toggle */}
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                  <input
                    type="checkbox"
                    id="qr-toggle"
                    checked={useQRCode}
                    onChange={(e) => setUseQRCode(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="qr-toggle" className="flex-1 text-sm font-medium text-foreground cursor-pointer">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-primary" />
                      Share via QR Code
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Recipients can scan instead of using a link</p>
                  </label>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={generatePaymentLink} className="bg-primary hover:bg-secondary text-primary-foreground">
                    {useQRCode ? 'Generate QR' : 'Generate Link'}
                  </Button>
                </div>
              </div>
            ) : step === 'qr' ? (
              <div className="space-y-4">
                {/* Request Summary */}
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Amount</span>
                    <span className="text-foreground font-semibold">KES {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">From</span>
                    <span className="text-foreground font-semibold">{recipientPhone}</span>
                  </div>
                  {description && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">For</span>
                      <span className="text-foreground font-semibold">{description}</span>
                    </div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center py-4">
                  <QRCodeGenerator data={paymentLink} size={240} level="H" />
                </div>

                {/* Share Info */}
                <p className="text-xs text-muted-foreground text-center">
                  Share this QR code with the payer. They can scan it to send you KES {amount}.
                </p>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" onClick={resetForm}>
                    Create New
                  </Button>
                  <Button
                    onClick={() => setStep('link')}
                    variant="outline"
                    className="flex items-center justify-center gap-2"
                  >
                    <LinkIcon className="w-4 h-4" />
                    View Link
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Request Summary */}
                <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Amount</span>
                    <span className="text-foreground font-semibold">KES {amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">From</span>
                    <span className="text-foreground font-semibold">{recipientPhone}</span>
                  </div>
                  {description && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">For</span>
                      <span className="text-foreground font-semibold">{description}</span>
                    </div>
                  )}
                </div>

                {/* Payment Link */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">Payment Link</label>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/20 rounded-lg">
                    <div className="flex gap-2 items-center">
                      <LinkIcon className="w-5 h-5 text-primary flex-shrink-0" />
                      <input
                        type="text"
                        value={paymentLink}
                        readOnly
                        className="flex-1 bg-transparent text-foreground text-xs font-mono break-all outline-none"
                      />
                      <Button 
                        onClick={copyToClipboard} 
                        size="sm" 
                        variant="default"
                        className="flex-shrink-0 gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground bg-blue-50 p-2 rounded border border-blue-200">
                    💡 Click "Copy" to copy the link, then share it with the payer via SMS, email, or messaging app.
                  </p>
                </div>

                {/* Share Info */}
                <p className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
                  Share this link with the payer. They can use it to send you KES {amount}.
                </p>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button variant="outline" onClick={resetForm}>
                    Create New
                  </Button>
                  {useQRCode && (
                    <Button
                      onClick={() => setStep('qr')}
                      className="bg-primary hover:bg-secondary text-primary-foreground flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      View QR
                    </Button>
                  )}
                  {!useQRCode && (
                    <Button
                      onClick={shareLink}
                      className="bg-primary hover:bg-secondary text-primary-foreground flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
