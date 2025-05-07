
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SidebarNav } from '@/components/SidebarNav';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import WhatsAppButton from '@/components/WhatsAppButton';

export const MainLayout = () => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-minhagrana-background">
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Logo />
        </div>
        <SidebarNav />
      </div>
      <div className="flex-1 flex flex-col">
        <Header 
          username={user?.user_metadata?.username || 'Usuário'} 
          onLogout={signOut} 
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <WhatsAppButton />
    </div>
  );
};
