import * as React from 'react';
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';

interface TransactionPreviewProps {
  data: {
    toAddress: string;
    amount: string;
    status: string;
    date: string;
    network: string;
  };
  onBack: () => void;
}

export const TransactionPreview = ({ data, onBack }: TransactionPreviewProps) => {
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleViewOnSolscan = async () => {
    try {
      // Get device type and dimensions
      const isMobile = window.innerWidth <= 768;
      const contentWidth = isMobile ? Math.min(390, window.innerWidth) : Math.min(500, window.innerWidth);
      const contentHeight = Math.min(window.innerHeight, document.documentElement.scrollHeight);
      const scale = window.devicePixelRatio * 2;

      // Save original viewport and styles
      const viewport = document.querySelector('meta[name="viewport"]');
      const originalViewport = viewport?.getAttribute('content');
      const originalStyles = {
        width: document.body.style.width,
        height: document.body.style.height,
        overflow: document.body.style.overflow,
        transform: document.body.style.transform,
        transformOrigin: document.body.style.transformOrigin,
        position: document.body.style.position,
        background: document.body.style.background,
        margin: document.body.style.margin,
        padding: document.body.style.padding
      };

      // Set viewport for consistent rendering
      viewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

      // Adjust body styles for screenshot
      document.body.style.width = `${contentWidth}px`;
      document.body.style.height = `${contentHeight}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.transform = 'none';
      document.body.style.transformOrigin = 'top left';
      document.body.style.position = 'relative';
      document.body.style.background = '#1C1C1C';
      document.body.style.margin = '0';
      document.body.style.padding = '0';

      // Take screenshot
      const canvas = await html2canvas(document.body, {
        backgroundColor: '#1C1C1C',
        scale,
        width: contentWidth,
        height: contentHeight,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Ensure the cloned document has the same styles
          const clonedBody = clonedDoc.body;
          clonedBody.style.width = `${contentWidth}px`;
          clonedBody.style.height = `${contentHeight}px`;
          clonedBody.style.overflow = 'hidden';
          clonedBody.style.transform = 'none';
          clonedBody.style.transformOrigin = 'top left';
          clonedBody.style.position = 'relative';
          clonedBody.style.background = '#1C1C1C';
          clonedBody.style.margin = '0';
          clonedBody.style.padding = '0';

          // Fix image aspect ratio in the clone
          const img = clonedDoc.querySelector('img[alt="Phantom Send"]') as HTMLImageElement;
          if (img) {
            img.style.position = 'absolute';
            img.style.inset = '0';
            img.style.width = '120%';
            img.style.height = '120%';
            img.style.top = '-10%';
            img.style.left = '-10%';
            img.style.objectFit = 'contain';
            img.style.filter = 'brightness(1.1)';
          }
        }
      });

      // Restore original styles
      document.body.style.width = originalStyles.width;
      document.body.style.height = originalStyles.height;
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.transform = originalStyles.transform;
      document.body.style.transformOrigin = originalStyles.transformOrigin;
      document.body.style.position = originalStyles.position;
      document.body.style.background = originalStyles.background;
      document.body.style.margin = originalStyles.margin;
      document.body.style.padding = originalStyles.padding;

      // Restore original viewport
      if (originalViewport) {
        viewport?.setAttribute('content', originalViewport);
      }
      
      // Convert to blob with maximum quality
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          return;
        }

        try {
          // Copy to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          
          // Open Solscan
          window.open('https://solscan.io', '_blank');
        } catch (err) {
          console.error('Failed to copy image:', err);
          // Still open Solscan even if copy fails
          window.open('https://solscan.io', '_blank');
        }
      }, 'image/png', 1.0);
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
      window.open('https://solscan.io', '_blank');
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const calculateNetworkFee = (amount: string): string => {
    const baseFee = 0.000005; // Base network fee
    const amountNum = parseFloat(amount);
    // Add 0.000001 SOL for each 0.1 SOL in the transaction
    const additionalFee = Math.floor(Math.abs(amountNum) * 10) * 0.000001;
    const totalFee = (baseFee + additionalFee).toFixed(6);
    return totalFee;
  };

  const networkFee = calculateNetworkFee(data.amount);

  return (
    <div className="h-full flex flex-col px-4 bg-[#1C1C1C]" ref={previewRef}>
      <div className="flex-1 flex flex-col">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <div className="absolute inset-0 rounded-full bg-[#1C1C1C]" />
              <img 
                src="https://i.ibb.co/SVnGBgc/Screenshot-2025-01-18-11-07-23-15-ef79cc85a7a51ea641d0806d9535b14e-removebg-preview.png"
                alt="Phantom Send" 
                className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] object-contain"
                style={{
                  filter: 'brightness(1.1)',
                }}
              />
            </div>
            <div className="text-3xl font-bold text-white">
              -{Math.abs(parseFloat(data.amount))} SOL
            </div>
          </div>

          <div className="space-y-3 bg-[#2C2D31] rounded-xl p-4">
            <div className="pb-3 border-b border-[#3F3F46]">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-sm font-semibold">Date</span>
                <span className="text-white text-sm font-semibold">{data.date}</span>
              </div>
            </div>
            <div className="pb-3 border-b border-[#3F3F46]">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-sm font-semibold">Status</span>
                <span className="text-[#4ADE80] text-sm font-semibold">{data.status}</span>
              </div>
            </div>
            <div className="pb-3 border-b border-[#3F3F46]">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-sm font-semibold">To</span>
                <span className="text-white text-sm font-semibold">{truncateAddress(data.toAddress)}</span>
              </div>
            </div>
            <div className="pb-3 border-b border-[#3F3F46]">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-sm font-semibold">Network</span>
                <span className="text-white text-sm font-semibold">{data.network}</span>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-sm font-semibold">Network Fee</span>
                <span className="text-white text-sm font-semibold">-{networkFee} SOL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1C1C]">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleViewOnSolscan}
            className="w-full bg-[#ab9ff1] hover:bg-[#9b8fe1] text-black font-medium text-lg py-4 rounded-full"
          >
            View on Solscan
          </button>
        </div>
      </div>
    </div>
  );
};