import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="
      min-h-screen w-full
      overflow-x-hidden
      flex flex-col
      px-4 sm:px-6 md:px-8
      mx-auto
      max-w-7xl
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      transition-colors duration-200
    ">
      {children}
    </div>
  );
};