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
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-phantom-text">Solana Generator</h1>
      <p className="text-phantom-textSecondary mb-8 text-center">
        Generate fake Solana transaction screenshots for fun
      </p>

      {!generatedData ? (
        <TransactionForm onGenerate={handleGenerate} />
      ) : (
        <TransactionPreview data={generatedData} onBack={handleBack} />
      )}

      <p className="text-phantom-textSecondary text-sm mt-8 text-center max-w-md">
        Note: This tool is for entertainment purposes only. Do not use it to deceive others.
      </p>
    </div>
  );
};

export default Index;