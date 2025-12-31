
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ServersPage from './components/ServersPage';
import UsersPage from './components/UsersPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';
import { ThemeProvider } from './contexts/ThemeContext';


// This application is built as a React Single-Page Application (SPA)
// to adhere to the project generation guidelines. It captures the enterprise
// look and feel requested, structured for a modern frontend environment.

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'servers':
        return <ServersPage />;
      case 'users':
        return <UsersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen text-gray-700 dark:text-gray-200 font-sans flex bg-transparent">
          <Sidebar activeView={activeView} onNavClick={setActiveView} />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              {renderContent()}
            </main>
          </div>
        </div>
        <ToastContainer />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;