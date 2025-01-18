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
      // Set fixed dimensions for better quality
      const width = 390; // iPhone width
      const height = document.documentElement.scrollHeight;
      const scale = 2; // Higher quality

      // Temporarily adjust body styles for screenshot
      const originalStyles = {
        width: document.body.style.width,
        height: document.body.style.height,
        overflow: document.body.style.overflow,
        transform: document.body.style.transform,
        transformOrigin: document.body.style.transformOrigin
      };

      document.body.style.width = `${width}px`;
      document.body.style.height = `${height}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.transform = 'scale(1)';
      document.body.style.transformOrigin = 'top left';

      // Take screenshot
      const canvas = await html2canvas(document.body, {
        backgroundColor: '#1C1C1C',
        scale,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
        useCORS: true,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // Ensure the cloned document has the same styles
          const clonedBody = clonedDoc.body;
          clonedBody.style.width = `${width}px`;
          clonedBody.style.height = `${height}px`;
          clonedBody.style.overflow = 'hidden';
          clonedBody.style.transform = 'scale(1)';
          clonedBody.style.transformOrigin = 'top left';
        }
      });

      // Restore original body styles
      document.body.style.width = originalStyles.width;
      document.body.style.height = originalStyles.height;
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.transform = originalStyles.transform;
      document.body.style.transformOrigin = originalStyles.transformOrigin;
      
      // Convert to blob
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
            <div className="w-40 h-40 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#1C1C1C]" />
              <div className="w-44 h-44 relative">
                <img 
                  src="https://i.ibb.co/SVnGBgc/Screenshot-2025-01-18-11-07-23-15-ef79cc85a7a51ea641d0806d9535b14e-removebg-preview.png"
                  alt="Phantom Send" 
                  className="w-full h-full object-contain"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    aspectRatio: '1/1',
                  }}
                />
              </div>
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