
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Calendar, 
  FolderTree,
  FileText,
  Target, 
  User,
  LogOut,
} from 'lucide-react';
import { MessageSquare } from 'lucide-react';

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
};

const NavItem = ({ href, icon, children, isActive }: NavItemProps) => {
  return (
    <Link 
      to={href} 
      className={`flex items-center gap-3 p-2 rounded-md ${
        isActive 
          ? 'bg-minhagrana-primary text-white' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export const SidebarNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="p-4 flex flex-col gap-1">
      <NavItem 
        href="/dashboard" 
        icon={<LayoutDashboard size={18} />} 
        isActive={currentPath === "/dashboard"}
      >
        Dashboard
      </NavItem>
      
      <NavItem 
        href="/transactions" 
        icon={<Wallet size={18} />} 
        isActive={currentPath === "/transactions"}
      >
        Transações
      </NavItem>
      
      <NavItem 
        href="/upcoming" 
        icon={<Calendar size={18} />} 
        isActive={currentPath === "/upcoming"}
      >
        Lançamentos Futuros
      </NavItem>
      
      <NavItem 
        href="/categories" 
        icon={<FolderTree size={18} />} 
        isActive={currentPath === "/categories"}
      >
        Categorias
      </NavItem>
      
      <NavItem 
        href="/reports" 
        icon={<FileText size={18} />} 
        isActive={currentPath === "/reports"}
      >
        Relatórios
      </NavItem>
      
      <NavItem 
        href="/goals" 
        icon={<Target size={18} />} 
        isActive={currentPath === "/goals"}
      >
        Metas
      </NavItem>
      
      <NavItem 
        href="/profile" 
        icon={<User size={18} />} 
        isActive={currentPath === "/profile"}
      >
        Perfil
      </NavItem>
      
      <NavItem 
        href="https://wa.me/557199622786" 
        icon={<MessageSquare size={18} className="text-minhagrana-primary" />} 
        isActive={false}
      >
        <span className="text-minhagrana-primary">WhatsApp</span>
      </NavItem>

      <div className="mt-auto pt-4 border-t border-gray-100 mt-4">
        <NavItem 
          href="/logout" 
          icon={<LogOut size={18} />} 
          isActive={false}
        >
          Sair
        </NavItem>
      </div>
    </nav>
  );
};
