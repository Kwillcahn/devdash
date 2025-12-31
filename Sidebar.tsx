
import React from 'react';
import Icon from './Icon';

interface NavItemProps {
  id: string;
  icon: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, icon, label, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`
      flex flex-col items-center justify-center w-full py-4 px-2 
      transition-all duration-300 ease-in-out relative group focus:outline-none
      ${active ? 'text-primary-green' : 'text-gray-500 hover:text-primary-cyan'}
    `}
  >
    <div className={`
      absolute left-0 top-0 h-full w-1 rounded-r-full
      transition-all duration-300 ease-in-out
      ${active ? 'bg-primary-green scale-y-100' : 'bg-primary-cyan scale-y-0 group-hover:scale-y-100'}
    `}></div>
    <Icon name={icon} className="w-7 h-7 mb-1" />
    <span className="text-xs font-medium tracking-wider uppercase">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  onNavClick: (view: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavClick }) => {
  return (
    <aside className="w-24 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-r border-gray-300 dark:border-white/10 flex flex-col items-center justify-between">
      <div>
        <div className="w-full h-24 flex items-center justify-center border-b border-gray-300 dark:border-white/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-primary-cyan animate-pulse"></div>
        </div>
        <nav className="flex flex-col items-center mt-4">
          <NavItem id="dashboard" icon="dashboard" label="Dashboard" active={activeView === 'dashboard'} onClick={onNavClick} />
          <NavItem id="servers" icon="servers" label="Servers" active={activeView === 'servers'} onClick={onNavClick} />
          <NavItem id="users" icon="users" label="Users" active={activeView === 'users'} onClick={onNavClick} />
          <NavItem id="reports" icon="reports" label="Reports" active={activeView === 'reports'} onClick={onNavClick} />
        </nav>
      </div>
      <div className="mb-4">
        <NavItem id="settings" icon="settings" label="Settings" active={activeView === 'settings'} onClick={onNavClick} />
      </div>
    </aside>
  );
};

export default Sidebar;