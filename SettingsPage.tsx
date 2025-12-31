import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import Icon from './Icon';

interface SettingToggleProps {
  label: string;
  description: string;
  initialValue?: boolean;
}

const SettingToggle: React.FC<SettingToggleProps> = ({ label, description, initialValue = false }) => {
  const [enabled, setEnabled] = useState(initialValue);
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 last:border-0">
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-primary-green' : 'bg-gray-300 dark:bg-white/10'}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'Security', 'Notifications', 'Billing'];

  const handleSave = () => {
    addToast('Settings updated successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your personal and system-wide preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 flex flex-row lg:flex-col overflow-x-auto space-x-2 lg:space-x-0 lg:space-y-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-left rounded-lg transition-all font-medium whitespace-nowrap ${activeTab === tab ? 'bg-primary-green/20 text-primary-green' : 'text-gray-500 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4">{activeTab} Settings</h3>
            
            {activeTab === 'General' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                      <input type="text" defaultValue="Admin User" className="w-full bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-green focus:outline-none dark:text-white" />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input type="email" defaultValue="admin@devkev.io" className="w-full bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-green focus:outline-none dark:text-white" />
                   </div>
                </div>
                <SettingToggle label="Compact View" description="Enable a tighter UI density for high-resolution displays." initialValue={true} />
                <SettingToggle label="Auto-refresh Dashboard" description="Automatically fetch new infrastructure data every 30 seconds." initialValue={true} />
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-4">
                <SettingToggle label="Two-Factor Authentication" description="Add an extra layer of security to your account." initialValue={false} />
                <SettingToggle label="Login Alerts" description="Notify me whenever a new login is detected from a new IP." initialValue={true} />
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/5">
                  <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-colors">Terminate All Active Sessions</button>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-2">
                 <SettingToggle label="Email Notifications" description="Receive system health reports via email." initialValue={true} />
                 <SettingToggle label="Critical Alert Pushes" description="Browser notifications for server failures." initialValue={true} />
                 <SettingToggle label="Weekly Digest" description="A summary of system uptime and performance metrics." initialValue={false} />
              </div>
            )}

             {activeTab === 'Billing' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                 <div className="w-16 h-16 bg-primary-cyan/10 rounded-full flex items-center justify-center text-primary-cyan mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                 </div>
                 <p className="text-gray-900 dark:text-white font-bold text-lg">Pro Enterprise Plan</p>
                 <p className="text-gray-500 text-sm mb-6">Next billing cycle: July 15, 2023</p>
                 <button className="px-6 py-2 bg-primary-green text-black font-bold rounded-lg hover:bg-primary-cyan transition-colors">Manage Subscription</button>
              </div>
            )}

            <div className="mt-8 flex justify-end space-x-4">
               <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-white">Cancel</button>
               <button onClick={handleSave} className="px-6 py-2 bg-primary-green/20 text-primary-green font-bold rounded-lg hover:bg-primary-green/30 border border-primary-green/50 transition-colors">Save Changes</button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary-cyan/10 to-primary-green/10 border border-white/10 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">API Tokens</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Generate access keys for automated reporting.</p>
            </div>
            <button className="px-4 py-2 bg-black/20 dark:bg-white/10 text-xs font-bold rounded border border-white/5 hover:bg-white/20 transition-all uppercase tracking-widest">Manage Tokens</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;