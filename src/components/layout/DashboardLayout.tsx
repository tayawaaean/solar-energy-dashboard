'use client';

import { ReactNode, memo } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = memo(function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  // For login page, render without sidebar and header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For all other pages, render with full layout
  return (
    <div className="flex h-screen bg-solar-dark-50 dark:bg-solar-dark-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
});

export default DashboardLayout;
