
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/2aea7cbe-f0f7-493b-bd85-5111e848323a.png" 
        alt="Minha Grana" 
        className="h-10"
      />
      <div className="font-bold text-lg">
        minha<span className="text-minhagrana-primary">grana</span>
      </div>
    </div>
  );
};

export default Logo;
