import React from 'react';

interface TwoColumnProps {
  leftColumn: React.ComponentType;
  rightColumn: React.ComponentType;
  gap?: 'sm' | 'md' | 'lg';
  ratio?: string;
}

const TwoColumn: React.FC<TwoColumnProps> = ({ 
  leftColumn: LeftColumn, 
  rightColumn: RightColumn, 
  gap = 'md', 
  ratio = '1fr 1fr' 
}) => {
  const gapClasses: Record<string, string> = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12'
  };

  return (
    <div 
      className={`grid ${gapClasses[gap]} grid-cols-2`}
      style={{ 
        gridTemplateColumns: ratio,
        display: 'grid'
      }}
    >
      <LeftColumn />
      <RightColumn />
    </div>
  );
};

export default TwoColumn; 