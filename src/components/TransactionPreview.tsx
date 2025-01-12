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
  const handleDownload = () => {
    console.log("Downloading screenshot...", data);
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="bg-[#181818] p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-white">
            {data.amount} SOL
          </div>
        </div>

        <div className="space-y-4 bg-[#282828] rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Date</span>
            <span className="text-white">{data.date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Status</span>
            <span className="text-phantom-secondary">{data.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">To</span>
            <span className="text-white">{data.toAddress}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Network</span>
            <span className="text-white">{data.network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Network Fee</span>
            <span className="text-white">{data.fee} SOL</span>
          </div>
        </div>

        <Button
          className="w-full bg-phantom-primary hover:bg-phantom-primary/90 text-white rounded-xl py-6"
          onClick={handleDownload}
        >
          View on Solscan
        </Button>
      </div>

      <div className="text-center text-red-500 text-sm font-medium">
        FAKE - FOR FUN ONLY
      </div>

      <Button
        onClick={onBack}
        variant="outline"
        className="w-full border-phantom-primary text-white hover:bg-phantom-primary/10"
      >
        Go Back
      </Button>
    </div>
  );
}