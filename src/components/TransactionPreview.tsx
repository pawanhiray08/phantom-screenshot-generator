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

  // Function to truncate address
  const truncateAddress = (address: string) => {
    if (address.length > 12) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return address;
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto px-4 md:px-0">
      <div className="bg-[#181818] p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-white">
            {data.amount} SOL
          </div>
        </div>

        <div className="space-y-4 bg-[#282828] rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#8F8F8F]">Date</span>
            <span className="text-white">{data.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F8F8F]">Status</span>
            <span className="text-[#00D18C]">{data.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F8F8F]">To</span>
            <span className="text-white">{truncateAddress(data.toAddress)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F8F8F]">Network</span>
            <span className="text-white">{data.network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8F8F8F]">Network Fee</span>
            <span className="text-white">{data.fee} SOL</span>
          </div>
        </div>

        <Button
          className="w-full bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 text-white rounded-xl py-6"
          onClick={handleViewOnSolscan}
        >
          View on Solscan
        </Button>
      </div>

      <Button
        onClick={onBack}
        variant="outline"
        className="w-full border-[#5D5FEF] text-white hover:bg-[#5D5FEF]/10"
      >
        Go Back
      </Button>
    </div>
  );
}