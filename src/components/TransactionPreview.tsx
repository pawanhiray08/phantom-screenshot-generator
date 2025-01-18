import React from 'react';
import { Button } from "@/components/ui/button";

interface TransactionPreviewProps {
  data: {
    toAddress: string;
    amount: string;
    fee: string;
    status: string;
    date: string;
    network: string;
  };
  onBack: () => void;
}

export function TransactionPreview({ data, onBack }: TransactionPreviewProps) {
  const handleViewOnSolscan = () => {
    window.open('https://solscan.io', '_blank');
  };

  const truncateAddress = (address: string) => {
    if (address.length > 12) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="bg-phantom-bg space-y-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center relative">
            <img 
              src="/phantom-logo.png" 
              alt="Phantom" 
              className="w-12 h-12 object-contain"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#00A3FF] rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-white flex items-center">
            <span className="mr-1">−</span>{data.amount} SOL
          </div>
        </div>

        <div className="space-y-4 bg-phantom-input rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary text-base">Date</span>
            <span className="text-white text-base">{data.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary text-base">Status</span>
            <span className="text-phantom-secondary text-base">{data.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary text-base">To</span>
            <span className="text-white text-base">{truncateAddress(data.toAddress)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary text-base">Network</span>
            <span className="text-white text-base">{data.network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary text-base">Network Fee</span>
            <span className="text-white text-base">−{data.fee} SOL</span>
          </div>
        </div>

        <Button
          className="w-full bg-phantom-primary hover:bg-phantom-primary/90 text-white rounded-full py-6 text-base font-normal"
          onClick={handleViewOnSolscan}
        >
          View on Solscan
        </Button>
      </div>
    </div>
  );
}