import React from 'react';
import { Button } from "@/components/ui/button";

interface TransactionPreviewProps {
  data: {
    toAddress: string;
    amount: string;
    fee: string;
    status: string;
  };
  onBack: () => void;
}

export function TransactionPreview({ data, onBack }: TransactionPreviewProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download the screenshot
    console.log("Downloading screenshot...", data);
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="bg-phantom-input p-6 rounded-lg border border-phantom-primary">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">To</span>
            <span className="text-phantom-text font-medium">{data.toAddress}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Amount</span>
            <span className="text-phantom-text font-medium">{data.amount} SOL</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Fee</span>
            <span className="text-phantom-text font-medium">{data.fee} SOL</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-phantom-textSecondary">Status</span>
            <span className={`font-medium ${
              data.status === 'Completed' ? 'text-phantom-secondary' :
              data.status === 'Failed' ? 'text-red-500' :
              'text-yellow-500'
            }`}>{data.status}</span>
          </div>
        </div>
      </div>

      <div className="text-center text-red-500 text-sm font-medium">
        FAKE - FOR FUN ONLY
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleDownload}
          className="w-full bg-phantom-primary hover:bg-phantom-primary/90 text-phantom-text"
        >
          Download Screenshot
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-phantom-primary text-phantom-text hover:bg-phantom-primary/10"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}