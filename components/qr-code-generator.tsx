'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  data: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
}

export function QRCodeGenerator({ data, size = 280, level = 'H' }: QRCodeGeneratorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!data || !containerRef.current) {
      return;
    }

    const loadQRLibrary = () => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      script.async = true;

      script.onload = () => {
        generateQRCode();
      };

      script.onerror = () => {
        setError('Failed to load QR code library');
      };

      document.head.appendChild(script);
    };

    const generateQRCode = () => {
      try {
        if (!containerRef.current) return;

        // Clear previous QR codes
        containerRef.current.innerHTML = '';

        const QRCode = (window as any).QRCode;
        if (!QRCode) {
          setError('QR Code library not available');
          return;
        }

        new QRCode(containerRef.current, {
          text: data,
          width: size,
          height: size,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel[level],
        });

        setQrGenerated(true);
        setError('');
      } catch (error) {
        setError('Failed to generate QR code');
      }
    };

    // Check if library is already loaded
    if ((window as any).QRCode) {
      generateQRCode();
    } else {
      loadQRLibrary();
    }
  }, [data, size, level]);

  const downloadQR = () => {
    if (!containerRef.current) return;

    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `payment-qr-${Date.now()}.png`;
    link.click();
  };

  const copyQRLink = () => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQR = () => {
    if (!containerRef.current) return;

    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], 'payment-qr.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Payment QR Code',
          text: 'Scan this QR code to make a payment',
        });
      } else if (navigator.share) {
        navigator.share({
          title: 'Payment QR Code',
          text: `Payment request: ${data}`,
        });
      } else {
        downloadQR();
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
          {error}
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-primary/20 min-h-[300px] flex items-center justify-center">
            <div
              ref={containerRef}
              className="flex items-center justify-center"
              style={{ width: size, height: size }}
            />
          </div>

          {qrGenerated && (
            <div className="flex gap-2 w-full max-w-xs">
              <Button
                onClick={downloadQR}
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-2 bg-transparent"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={copyQRLink}
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-2 bg-transparent"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                onClick={shareQR}
                size="sm"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
