import { useState } from 'react';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionPreview } from '@/components/TransactionPreview';
import { X } from 'lucide-react';
import phantomLogo from '../assets/phantom-logo.svg';

const Index = () => {
  const [generatedData, setGeneratedData] = useState<any>(null);

  const handleGenerate = (data: any) => {
    setGeneratedData(data);
  };

  const handleBack = () => {
    setGeneratedData(null);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 md:px-8 bg-[#181818]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={handleBack} className="text-white hover:text-gray-300">
            <X size={24} />
          </button>
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <img src={phantomLogo} alt="Phantom Logo" className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold">Phantom Screenshot Generator</h1>
        </div>

        {!generatedData ? (
          <TransactionForm onGenerate={handleGenerate} />
        ) : (
          <TransactionPreview data={generatedData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Index;