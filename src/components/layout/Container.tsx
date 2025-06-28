import React from 'react';

interface ContainerProps {
  content: React.ComponentType;
  maxWidth?: 'full' | 'lg' | 'md' | 'sm';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Container: React.FC<ContainerProps> = ({ content: Content, maxWidth = 'lg', padding = 'md' }) => {
  const maxWidthClasses: Record<string, string> = {
    full: 'w-full',
    lg: 'max-w-7xl',
    md: 'max-w-4xl',
    sm: 'max-w-2xl'
  };
  
  const paddingClasses: Record<string, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]}`}>
      <Content />
    </div>
  );
};

export default Container; 