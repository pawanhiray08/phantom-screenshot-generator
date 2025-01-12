import { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionPreview } from '@/components/TransactionPreview';

const Index = () => {
  const [generatedData, setGeneratedData] = useState<any>(null);

  const handleGenerate = (data: any) => {
    setGeneratedData(data);
  };

  const handleBack = () => {
    setGeneratedData(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            {!generatedData ? "Send" : "Sent"}
          </h1>
        </div>

        {!generatedData ? (
          <TransactionForm onGenerate={handleGenerate} />
        ) : (
          <TransactionPreview data={generatedData} onBack={handleBack} />
        )}

        <p className="text-phantom-textSecondary text-sm mt-8 text-center">
          Note: This tool is for entertainment purposes only.
        </p>
      </div>
    </div>
  );
};

export default Index;