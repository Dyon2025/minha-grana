
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import { SidebarNav } from '@/components/SidebarNav';

type MainLayoutProps = {
  children?: React.ReactNode;
  username?: string;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  username = "Usuário" 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header username={username} />
      <div className="flex flex-1">
        <SidebarNav />
        <main className="flex-1 p-6 bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
