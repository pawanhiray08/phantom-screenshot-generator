import * as React from 'react';
import { Button } from "@/components/ui/button";

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

export default function TransactionPreview({ data, onBack }: TransactionPreviewProps) {
  const handleViewOnSolscan = () => {
    window.open('https://solscan.io', '_blank');
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
    <div className="h-full flex flex-col px-4 bg-[#1C1C1C]">
      <div className="flex-1 flex flex-col">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <div className="w-28 h-28 relative">
              <div className="absolute inset-0 rounded-full bg-[#1C1C1C]" />
              <img 
                src="https://i.ibb.co/SVnGBgc/Screenshot-2025-01-18-11-07-23-15-ef79cc85a7a51ea641d0806d9535b14e-removebg-preview.png"
                alt="Phantom Send" 
                className="w-32 h-32 absolute -top-2 -left-2 object-contain"
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