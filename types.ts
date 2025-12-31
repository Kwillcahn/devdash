export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface SystemInfo {
    os: string;
    host: string;
    kernel: string;
    uptime: string;
    cpu: string;
    gpu: string;
    memory: string;
    cpuUsage: number;
    memoryUsage: number;
    cpuHistory: ChartDataPoint[];
    memoryHistory: ChartDataPoint[];
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  status: 'Online' | 'Warning' | 'Offline';
  cpuLoad: number; // percentage
  ramUsage: number; // percentage
  diskUsage: number; // percentage
  cpuHistory: ChartDataPoint[];
  ramHistory: ChartDataPoint[];
  diskHistory: ChartDataPoint[];
}

export interface VirtualMachine {
  id: string;
  name: string;
  status: 'Running' | 'Stopped' | 'Suspended';
  hostServer: string;
  cpuUsage: number; // percentage
  ramUsage: number; // percentage
}

export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: 'Running' | 'Exited' | 'Paused';
  cpuUsage: number; // percentage
  memUsage: number; // in MB
}

export interface NetworkStats {
  throughputIn: number; // Mbps
  throughputOut: number; // Mbps
  totalDataIn: number; // GB
  totalDataOut: number; // GB
  history: ChartDataPoint[];
}

export interface Alert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  source: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
}

export interface BusinessMetric {
  label: string;
  value: string;
  trend: number; // percentage change
  data: ChartDataPoint[];
}

export interface ReportItem {
  id: string;
  title: string;
  type: 'Performance' | 'Security' | 'Uptime';
  date: string;
  status: 'Ready' | 'Generating';
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
