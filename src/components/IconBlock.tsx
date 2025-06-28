import React from 'react';

interface IconBlockProps {
  id: string;
  icon: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const IconBlock: React.FC<IconBlockProps> = ({ 
  id, 
  icon, 
  size = 'medium',
  color = '#3B82F6',
  align = 'left',
  className = ''
}) => {
  const getIconSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'text-2xl';
      case 'large':
        return 'text-6xl';
      default:
        return 'text-4xl';
    }
  };

  const getAlignment = (alignment: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  return (
    <div 
      id={id}
      className={`mb-6 ${getAlignment(align)} ${className}`}
      data-puck-type="IconBlock"
    >
      <div 
        className={`${getIconSize(size)} inline-block`}
        style={{ 
          color: color,
          textAlign: align as 'left' | 'center' | 'right'
        }}
      >
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default IconBlock; 