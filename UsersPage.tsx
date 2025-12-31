import React from 'react';
import UserList from './UserList';
import { usersData } from '../mockData';

const UsersPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Users</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage user accounts and permissions.</p>
      <UserList users={usersData} />
    </div>
  );
};

export default UsersPage;