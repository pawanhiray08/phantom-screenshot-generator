import * as React from 'react';
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

export const TransactionPreview: React.FC<TransactionPreviewProps> = ({
  data,
  onBack,
}) => {
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
          <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center p-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6E8BF7" />
                  <stop offset="100%" stopColor="#9C6EF7" />
                </linearGradient>
              </defs>
              <path
                d="M50 15 L75 30 L75 70 L50 85 L25 70 L25 30 Z"
                fill="url(#logoGradient)"
              />
              <circle
                cx="65"
                cy="65"
                r="15"
                fill="#45B7F6"
                className="drop-shadow-lg"
              />
              <path
                d="M60 60 L70 65 L60 70 Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-4xl font-bold text-white">
            {parseFloat(data.amount) < 0 ? data.amount : `+${data.amount}`} SOL
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