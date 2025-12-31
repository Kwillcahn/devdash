import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { User } from '../types';
import { useToast } from '../contexts/ToastContext';

const StatusIndicator: React.FC<{ status: User['status'] }> = ({ status }) => {
  const colorClass = {
    Active: 'bg-green-500',
    Inactive: 'bg-gray-500',
    Suspended: 'bg-red-500',
  }[status];

  return (
    <div className="flex items-center space-x-2">
        <span className={`w-2.5 h-2.5 rounded-full ${colorClass}`}></span>
        <span>{status}</span>
    </div>
  );
};

const RoleBadge: React.FC<{ role: User['role'] }> = ({ role }) => {
    const colorClasses = {
        Admin: 'bg-primary-green/20 text-primary-green',
        Editor: 'bg-primary-cyan/20 text-primary-cyan',
        Viewer: 'bg-white/20 text-gray-300'
    }[role];

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
            {role}
        </span>
    );
};


interface UserListProps {
  users: User[];
}

const ITEMS_PER_PAGE = 5;

const UserList: React.FC<UserListProps> = ({ users }) => {
  const { addToast } = useToast();
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isInitialMount = useRef(true);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const roleMatch = !roleFilter || roleFilter === 'All' || user.role === roleFilter;
      const statusMatch = !statusFilter || statusFilter === 'All' || user.status === statusFilter;
      return roleMatch && statusMatch;
    });
  }, [users, roleFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }
    addToast("Filters updated successfully.", 'success');
  }, [roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const roleOptions: ('All' | User['role'])[] = ['All', 'Admin', 'Editor', 'Viewer'];
  const statusOptions: ('All' | User['status'])[] = ['All', 'Active', 'Inactive', 'Suspended'];
  
  const paginationButtonClasses = "px-4 py-2 text-sm font-semibold bg-gray-500/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:bg-gray-500/20 dark:hover:enabled:bg-white/10 hover:enabled:border-primary-cyan/50";

  return (
    <div className="bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl p-4 sm:p-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div>
          <label htmlFor="role-filter" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Filter by Role</label>
          <div className="relative">
            <select
              id="role-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`appearance-none bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green transition-all duration-300 w-full sm:w-auto ${!roleFilter ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
              aria-label="Filter users by role"
            >
              <option value="" disabled>Select Role</option>
              {roleOptions.map(option => (
                <option key={option} value={option} className="bg-white dark:bg-base-dark text-gray-900 dark:text-white">
                  {option === 'All' ? 'All Roles' : option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="status-filter" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Filter by Status</label>
           <div className="relative">
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`appearance-none bg-white/80 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-green transition-all duration-300 w-full sm:w-auto ${!statusFilter ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
              aria-label="Filter users by status"
            >
              <option value="" disabled>Select Status</option>
              {statusOptions.map(option => (
                <option key={option} value={option} className="bg-white dark:bg-base-dark text-gray-900 dark:text-white">
                  {option === 'All' ? 'All Statuses' : option}
                </option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider border-b border-gray-200 dark:border-white/10 pb-3 mb-3 px-4">
        <div className="col-span-3">User</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Last Login</div>
      </div>
      
      {/* Table Body */}
      <div className="space-y-2">
        {paginatedUsers.length > 0 ? (
            paginatedUsers.map(user => (
              <div key={user.id} className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-4 items-center bg-gray-500/10 dark:bg-white/5 hover:bg-gray-500/20 dark:hover:bg-white/10 transition-colors duration-200 rounded-lg p-4 text-sm" role="row">
                <div className="md:col-span-3 flex items-center space-x-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-primary-cyan/60" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 md:hidden">{user.email}</p>
                  </div>
                </div>
                <div className="hidden md:block md:col-span-3 font-mono text-gray-600 dark:text-gray-300 truncate">
                  {user.email}
                </div>
                <div className="md:col-span-2">
                  <RoleBadge role={user.role} />
                </div>
                <div className="md:col-span-2 text-gray-800 dark:text-gray-300">
                    <StatusIndicator status={user.status} />
                </div>
                <div className="hidden md:block md:col-span-2 text-gray-600 dark:text-gray-400 text-xs">
                    {user.lastLogin}
                </div>
              </div>
            ))
        ) : (
            <div className="text-center py-8 text-gray-500">
                No users match the current filters.
            </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
          </span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(p => p - 1)} 
              disabled={currentPage === 1} 
              className={paginationButtonClasses}
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentPage(p => p + 1)} 
              disabled={currentPage === totalPages} 
              className={paginationButtonClasses}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;