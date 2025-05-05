
import React from 'react';
import { Bell, RotateCw } from 'lucide-react';
import Logo from './Logo';

type HeaderProps = {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = "Usuário" }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
      <Logo />
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-1 text-minhagrana-primary cursor-pointer hover:text-minhagrana-primary-dark">
          <RotateCw size={18} />
        </div>
        
        <div className="flex items-center gap-1 text-minhagrana-primary cursor-pointer hover:text-minhagrana-primary-dark">
          <Bell size={18} />
        </div>
        
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium">Olá, {username}</div>
            <div className="text-xs text-gray-500">Bem-vindo ao seu painel financeiro</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
