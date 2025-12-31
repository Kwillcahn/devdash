import React, { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  expandedContent: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, expandedContent, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Toggles on Enter or Space for keyboard accessibility.
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  return (
    <div 
        className={`group relative perspective-1000 ${className}`}
        onClick={toggleExpand}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-expanded={isExpanded}
        role="button"
        title="Click to expand/collapse. Click and drag to move."
    >
      {/* Glow Effect: subtle glow on hover, stronger glow when expanded */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-green to-primary-cyan rounded-xl blur-lg transition-opacity duration-500 ${isExpanded ? 'opacity-40' : 'opacity-10 group-hover:opacity-25'}`}></div>

      {/* Card Content Container: subtle lift on hover, full transform when expanded */}
      <div className={`relative transform-style-3d transition-transform duration-500 ${isExpanded ? '-translate-y-2 rotate-x-6 rotate-y-2' : 'group-hover:-translate-y-1'}`}>
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-black/40 overflow-hidden">
          {/* Always Visible Content */}
          <div className="p-6">
            {children}
          </div>
          
          {/* Expandable Content */}
          <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className={`border-t border-gray-200 dark:border-white/10 pt-4 pb-6 px-6 transition-opacity duration-500 ${isExpanded ? 'opacity-100 delay-200' : 'opacity-0'}`}>
                {expandedContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;