import React, { useState } from 'react';
import { Navbar } from '@/components/adminlayout/Navbar';
import { Sidebar } from '@/components/adminlayout/Sidebar';

export const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 w-full min-w-0 md: ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};
