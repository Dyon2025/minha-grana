
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/557199622786"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-6 bottom-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
      aria-label="Chat no WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
