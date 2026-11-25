import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetImage } from '@/components/AssetImage';
import { CandyButton } from '@/components/CandyButton';
import { Compass } from 'lucide-react';

export const NotFoundScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky flex flex-col items-center justify-center p-4 text-center">
      <div className="cream-card max-w-md w-full p-8 border-4 border-sunshine shadow-2xl space-y-4">
        <div className="w-32 h-32 mx-auto animate-bounce-gentle">
          <AssetImage assetKey="mascot-owl" className="w-full h-full object-contain" />
        </div>
        <h1 className="font-heading text-4xl text-deep-teal">Lost in the Jungle?</h1>
        <p className="font-body text-deep-teal/70 font-bold">
          Professor Owl can guide you right back to your math adventure!
        </p>
        <CandyButton
          variant="green"
          onClick={() => navigate('/home')}
          className="w-full py-4 text-xl"
        >
          <span className="flex items-center justify-center gap-2">
            <Compass className="w-6 h-6" />
            Back to Jungle Island
          </span>
        </CandyButton>
      </div>
    </div>
  );
};
