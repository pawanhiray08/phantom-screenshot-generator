import { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionPreview } from '@/components/TransactionPreview';
import { X } from 'lucide-react';

const Index = () => {
  const [generatedData, setGeneratedData] = useState<any>(null);

  const handleGenerate = (data: any) => {
    setGeneratedData(data);
  };

  const handleBack = () => {
    setGeneratedData(null);
  };

  return (
    <div className="h-[100vh] flex flex-col bg-[#1C1C1C] fixed inset-0">
      <div className="w-full max-w-md mx-auto flex flex-col h-full pb-24">
        <div className="flex items-center gap-3 bg-[#2c2d31] py-2.5 px-3 rounded-b">
          <button onClick={handleBack} className="text-white hover:text-gray-300">
            <X size={20} />
          </button>
          <h1 className="text-base font-medium text-white">
            Sent
          </h1>
        </div>

        <div className="flex-1 overflow-hidden">
          {!generatedData ? (
            <TransactionForm onGenerate={handleGenerate} />
          ) : (
            <TransactionPreview data={generatedData} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;