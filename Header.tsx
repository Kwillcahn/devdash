import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="h-24 bg-gray-50/10 dark:bg-black/10 backdrop-blur-xl border-b border-gray-300 dark:border-white/10 flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wider">
          DEVKEV <span className="text-primary-green">DASHBOARD</span>
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Real-time Infrastructure & Application Monitoring</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..."
            className="bg-gray-200/50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full py-2 px-4 w-64 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green transition-all duration-300"
          />
        </div>
        <ThemeToggle />
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">System Operator</p>
          </div>
          <img 
            src="https://picsum.photos/40" 
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-primary-cyan"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;