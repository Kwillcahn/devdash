
import React, { useState, useRef } from 'react';
import ServerStatusCard from './ServerStatusCard';
import VirtualMachinesCard from './UserActivityCard';
import DockerContainersCard from './RevenueCard';
import SystemInfoCard from './SystemInfoCard';
import NetworkActivityCard from './NetworkActivityCard';
import RecentAlertsCard from './RecentAlertsCard';
import { serversData, vmsData, dockerContainersData, systemInfoData, networkStatsData, alertsData } from '../mockData';

interface CardComponent {
  id: string;
  component: React.ReactNode;
  gridSpan: string;
}

const initialCards: CardComponent[] = [
  { id: 'systemInfo', component: <SystemInfoCard systemInfo={systemInfoData} />, gridSpan: 'lg:col-span-12' },
  { id: 'serverStatus', component: <ServerStatusCard servers={serversData} />, gridSpan: 'lg:col-span-6' },
  { id: 'vms', component: <VirtualMachinesCard vms={vmsData} />, gridSpan: 'lg:col-span-6' },
  { id: 'docker', component: <DockerContainersCard containers={dockerContainersData} />, gridSpan: 'lg:col-span-4' },
  { id: 'network', component: <NetworkActivityCard stats={networkStatsData} />, gridSpan: 'lg:col-span-4' },
  { id: 'alerts', component: <RecentAlertsCard alerts={alertsData} />, gridSpan: 'lg:col-span-4' },
];

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState<CardComponent[]>(initialCards);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const dragNode = useRef<EventTarget | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index;
    dragNode.current = e.target;
    e.dataTransfer.effectAllowed = 'move';
    // Use a timeout to allow the browser to render the drag image before applying styles
    setTimeout(() => {
        if (dragNode.current instanceof HTMLElement) {
            dragNode.current.classList.add('dragging');
        }
    }, 0);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === index) return;
    
    // Clean up any existing placeholders and add a new one
    document.querySelectorAll('.drop-placeholder').forEach(el => el.classList.remove('drop-placeholder'));
    e.currentTarget.classList.add('drop-placeholder');
    
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    // Ensure placeholder is removed immediately on drop
    document.querySelectorAll('.drop-placeholder').forEach(el => el.classList.remove('drop-placeholder'));

    if (dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
        return; // No change
    };

    const newCards = [...cards];
    const draggedItemContent = newCards.splice(dragItem.current, 1)[0];
    newCards.splice(dragOverItem.current, 0, draggedItemContent);
    setCards(newCards);
  };

  const handleDragEnd = () => {
    // Final cleanup for classes and refs
    if (dragNode.current instanceof HTMLElement) {
        dragNode.current.classList.remove('dragging');
    }
    document.querySelectorAll('.drop-placeholder').forEach(el => el.classList.remove('drop-placeholder'));

    dragItem.current = null;
    dragOverItem.current = null;
    dragNode.current = null;
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Remove placeholder if we leave the element entirely
    e.currentTarget.classList.remove('drop-placeholder');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
       {cards.map((card, index) => (
        <div
          key={card.id}
          className={`${card.gridSpan} draggable-card transition-all duration-300 ease-in-out`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={(e) => e.preventDefault()} // This is necessary to allow dropping
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onDragLeave={handleDragLeave}
        >
          {card.component}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;