
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SidebarNav } from '@/components/SidebarNav';
import { useAuth } from '@/contexts/AuthContext';

export const MainLayout = () => {
  const { user, signOut } = useAuth();
  
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header 
          username={user?.user_metadata?.username || 'Usuário'} 
          onLogout={signOut} 
        />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
