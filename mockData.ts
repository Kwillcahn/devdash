import type { Server, VirtualMachine, DockerContainer, SystemInfo, NetworkStats, Alert, ChartDataPoint, User, BusinessMetric, ReportItem } from './types';

const cpuHistory = Array.from({ length: 15 }, (_, i) => ({
    name: i === 14 ? 'Now' : `-${(14 - i) * 2}s`,
    value: Math.max(10, Math.round(45 + (Math.random() - 0.5) * 25)),
}));
cpuHistory[14].value = 45;

const memoryHistory = Array.from({ length: 15 }, (_, i) => ({
    name: i === 14 ? 'Now' : `-${(14 - i) * 2}s`,
    value: Math.max(20, Math.round(34 + (Math.random() - 0.5) * 8)),
}));
memoryHistory[14].value = 34;


export const systemInfoData: SystemInfo = {
    os: 'Ubuntu 22.04.3 LTS x86_64',
    host: 'DevKev-HP-Spectre-x360',
    kernel: '6.5.0-14-generic',
    uptime: '2 hours, 15 mins',
    cpu: 'Intel Core Ultra 7 155H (16) @ 4.80GHz',
    gpu: 'Intel Arc Graphics',
    memory: '5432MiB / 16052MiB',
    cpuUsage: 45,
    memoryUsage: 34,
    cpuHistory,
    memoryHistory,
};

export const serversData: Server[] = [
  { 
    id: 'srv-01', name: 'Primary Web Server', ip: '192.168.1.10', status: 'Online', 
    cpuLoad: 78, ramUsage: 65, diskUsage: 80,
    cpuHistory: [
        { name: '-30m', value: 65 }, { name: '-25m', value: 70 }, { name: '-20m', value: 68 },
        { name: '-15m', value: 75 }, { name: '-10m', value: 80 }, { name: '-5m', value: 77 },
        { name: 'Now', value: 78 },
    ],
    ramHistory: [
        { name: '-30m', value: 60 }, { name: '-25m', value: 62 }, { name: '-20m', value: 61 },
        { name: '-15m', value: 64 }, { name: '-10m', value: 63 }, { name: '-5m', value: 65 },
        { name: 'Now', value: 65 },
    ],
    diskHistory: [
        { name: '-30m', value: 79 }, { name: '-25m', value: 79 }, { name: '-20m', value: 79 },
        { name: '-15m', value: 80 }, { name: '-10m', value: 80 }, { name: '-5m', value: 80 },
        { name: 'Now', value: 80 },
    ]
  },
  { id: 'srv-02', name: 'Database Server', ip: '192.168.1.12', status: 'Online', cpuLoad: 55, ramUsage: 88, diskUsage: 60, cpuHistory: [], ramHistory: [], diskHistory: [] },
  { id: 'srv-03', name: 'Cache Server', ip: '192.168.1.15', status: 'Warning', cpuLoad: 92, ramUsage: 45, diskUsage: 95, cpuHistory: [], ramHistory: [], diskHistory: [] },
  { id: 'srv-04', name: 'Backup Server', ip: '192.168.1.20', status: 'Offline', cpuLoad: 0, ramUsage: 10, diskUsage: 70, cpuHistory: [], ramHistory: [], diskHistory: [] },
];

export const vmsData: VirtualMachine[] = [
  { id: 'vm-01', name: 'dev-environment-1', status: 'Running', hostServer: 'Primary Web Server', cpuUsage: 60, ramUsage: 50 },
  { id: 'vm-02', name: 'staging-api', status: 'Running', hostServer: 'Primary Web Server', cpuUsage: 80, ramUsage: 75 },
  { id: 'vm-03', name: 'legacy-app-support', status: 'Suspended', hostServer: 'Database Server', cpuUsage: 0, ramUsage: 20 },
  { id: 'vm-04', name: 'ci-cd-runner', status: 'Stopped', hostServer: 'Database Server', cpuUsage: 0, ramUsage: 5 },
];

export const dockerContainersData: DockerContainer[] = [
    { id: 'dck-01', name: 'nginx-proxy', image: 'nginx:latest', status: 'Running', cpuUsage: 15, memUsage: 128 },
    { id: 'dck-02', name: 'app-backend-prod', image: 'my-app:1.2.3', status: 'Running', cpuUsage: 85, memUsage: 2048 },
    { id: 'dck-03', name: 'redis-cache', image: 'redis:alpine', status: 'Running', cpuUsage: 30, memUsage: 512 },
    { id: 'dck-04', name: 'old-job-processor', image: 'batch-worker:0.9', status: 'Exited', cpuUsage: 0, memUsage: 64 },
];

export const networkStatsData: NetworkStats = {
  throughputIn: 125.8,
  throughputOut: 78.3,
  totalDataIn: 512.4,
  totalDataOut: 320.1,
  history: [
    { name: '-30m', value: 110 }, { name: '-25m', value: 115 }, { name: '-20m', value: 130 },
    { name: '-15m', value: 120 }, { name: '-10m', value: 128 }, { name: '-5m', value: 122 },
    { name: 'Now', value: 125.8 },
  ],
};

export const alertsData: Alert[] = [
  { id: 'al-01', severity: 'Critical', message: 'Database server CPU at 98%', timestamp: '1 min ago', source: 'srv-02' },
  { id: 'al-02', severity: 'Warning', message: 'Cache server disk space at 95%', timestamp: '5 mins ago', source: 'srv-03' },
  { id: 'al-03', severity: 'Warning', message: 'Failed login attempt from 203.0.113.10', timestamp: '15 mins ago', source: 'Firewall' },
  { id: 'al-04', severity: 'Info', message: 'New user "testuser" created', timestamp: '30 mins ago', source: 'Auth Service' },
];

export const usersData: User[] = [
  { id: 'usr-01', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=1', email: 'alex.j@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
  { id: 'usr-02', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=2', email: 'maria.g@example.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago' },
  { id: 'usr-03', name: 'James Smith', avatar: 'https://i.pravatar.cc/150?u=3', email: 'james.s@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '3 weeks ago' },
  { id: 'usr-04', name: 'Patricia Williams', avatar: 'https://i.pravatar.cc/150?u=4', email: 'patricia.w@example.com', role: 'Editor', status: 'Active', lastLogin: '5 mins ago' },
];

export const businessMetricsData: BusinessMetric[] = [
  { 
    label: 'Total Revenue', 
    value: '$128,430', 
    trend: 12.5,
    data: [
      { name: 'Jan', value: 95000 }, { name: 'Feb', value: 102000 }, { name: 'Mar', value: 108000 },
      { name: 'Apr', value: 115000 }, { name: 'May', value: 121000 }, { name: 'Jun', value: 128430 }
    ]
  },
  { 
    label: 'Active Subscriptions', 
    value: '1,240', 
    trend: 8.2,
    data: [
      { name: 'Jan', value: 800 }, { name: 'Feb', value: 950 }, { name: 'Mar', value: 1020 },
      { name: 'Apr', value: 1100 }, { name: 'May', value: 1180 }, { name: 'Jun', value: 1240 }
    ]
  },
  { 
    label: 'Avg. Load Time', 
    value: '420ms', 
    trend: -4.1,
    data: [
      { name: 'Jan', value: 550 }, { name: 'Feb', value: 520 }, { name: 'Mar', value: 500 },
      { name: 'Apr', value: 480 }, { name: 'May', value: 450 }, { name: 'Jun', value: 420 }
    ]
  }
];

export const reportsData: ReportItem[] = [
  { id: 'rep-01', title: 'Q2 Performance Summary', type: 'Performance', date: '2023-06-15', status: 'Ready' },
  { id: 'rep-02', title: 'Monthly Security Audit', type: 'Security', date: '2023-06-10', status: 'Ready' },
  { id: 'rep-03', title: 'Annual Infrastructure Uptime', type: 'Uptime', date: '2023-05-30', status: 'Ready' },
  { id: 'rep-04', title: 'Real-time Traffic Analysis', type: 'Performance', date: '2023-06-20', status: 'Generating' },
];
