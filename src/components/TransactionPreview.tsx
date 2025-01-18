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
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="bg-phantom-bg space-y-6 p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 relative">
              <div className="absolute inset-0 rounded-full bg-black -z-10" />
              <img 
                src="https://i.ibb.co/SVnGBgc/Screenshot-2025-01-18-11-07-23-15-ef79cc85a7a51ea641d0806d9535b14e-removebg-preview.png"
                alt="Phantom Send" 
                className="w-24 h-24 absolute -top-2 -left-2 object-cover"
              />
            </div>
            <div className="text-4xl font-bold text-white">
              -{Math.abs(parseFloat(data.amount))} SOL
            </div>
          </div>

          <div className="space-y-4 bg-phantom-input rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-phantom-textSecondary text-base font-semibold">Date</span>
              <span className="text-white text-base font-semibold">{data.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-phantom-textSecondary text-base font-semibold">Status</span>
              <span className="text-green-500 text-base font-semibold">{data.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-phantom-textSecondary text-base font-semibold">To</span>
              <span className="text-white text-base font-semibold">{truncateAddress(data.toAddress)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-phantom-textSecondary text-base font-semibold">Network</span>
              <span className="text-white text-base font-semibold">{data.network}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-phantom-textSecondary text-base font-semibold">Network Fee</span>
              <span className="text-white text-base font-semibold">-{data.fee} SOL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Button
          onClick={handleViewOnSolscan}
          className="w-full bg-[#ab9ff1] hover:bg-[#9b8fe1] text-black font-semibold"
        >
          View on Solscan
        </Button>
      </div>
    </div>
  );
};