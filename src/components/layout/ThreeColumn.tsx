import React from 'react';

interface ThreeColumnProps {
  leftColumn: React.ComponentType;
  centerColumn: React.ComponentType;
  rightColumn: React.ComponentType;
  gap?: 'sm' | 'md' | 'lg';
}

const ThreeColumn: React.FC<ThreeColumnProps> = ({ 
  leftColumn: LeftColumn, 
  centerColumn: CenterColumn, 
  rightColumn: RightColumn, 
  gap = 'md' 
}) => {
  const gapClasses: Record<string, string> = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12'
  };

  return (
    <div className={`grid ${gapClasses[gap]} grid-cols-3`}>
      <LeftColumn />
      <CenterColumn />
      <RightColumn />
    </div>
  );
};

export default ThreeColumn; 