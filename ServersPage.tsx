
import React from 'react';
import ServerList from './ServerList';
import { serversData } from '../mockData';

const ServersPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Servers</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Monitor and manage server infrastructure.</p>
      <ServerList servers={serversData} />
    </div>
  );
};

export default ServersPage;