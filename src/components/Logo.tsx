
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 rounded bg-minhagrana-primary flex items-center justify-center text-white">
        <div className="absolute inset-0 rounded-sm bg-white/20 flex items-center justify-center">
          <span className="font-bold text-white">MG</span>
        </div>
      </div>
      <div className="font-bold text-lg">
        minha<span className="text-minhagrana-primary">grana</span>
      </div>
    </div>
  );
};

export default Logo;
