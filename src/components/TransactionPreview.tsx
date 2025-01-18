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
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 rounded-full bg-black -z-10" />
            <img 
              src="https://i.ibb.co/SVnGBgc/Screenshot-2025-01-18-11-07-23-15-ef79cc85a7a51ea641d0806d9535b14e-removebg-preview.png"
              alt="Phantom Send" 
              className="w-40 h-40 absolute -top-4 -left-4 object-cover"
            />
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