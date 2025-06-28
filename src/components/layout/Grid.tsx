import React from 'react';

interface GridProps {
  content: React.ComponentType;
  columns?: '2' | '3' | '4' | '5' | '6';
  gap?: 'sm' | 'md' | 'lg';
}

const Grid: React.FC<GridProps> = ({ 
  content: Content, 
  columns = '3', 
  gap = 'md' 
}) => {
  const gapClasses: Record<string, string> = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const gridCols: Record<string, string> = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
    '6': 'grid-cols-6'
  };

  return (
    <div className={`grid ${gapClasses[gap]} ${gridCols[columns]}`}>
      <Content />
    </div>
  );
};

export default Grid; 