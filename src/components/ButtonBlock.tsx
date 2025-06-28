import React from 'react';

interface ButtonBlockProps {
  id: string;
  text: string;
  url?: string;
  button_type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const ButtonBlock: React.FC<ButtonBlockProps> = ({ 
  id, 
  text, 
  url = '#',
  button_type = 'primary',
  size = 'medium',
  align = 'left',
  className = ''
}) => {
  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'outline':
        return 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const getButtonSize = (size: string) => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getAlignment = (alignment: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const buttonClasses = `
    inline-block 
    font-semibold 
    rounded-lg 
    transition-all 
    duration-200 
    shadow-md 
    hover:shadow-lg 
    transform 
    hover:scale-105 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:ring-opacity-50
    ${getButtonStyle(button_type)}
    ${getButtonSize(size)}
  `;

  return (
    <div 
      id={id}
      className={`mb-6 ${getAlignment(align)} ${className}`}
      data-puck-type="ButtonBlock"
    >
      <a 
        href={url}
        className={buttonClasses}
        style={{ 
          textAlign: align as 'left' | 'center' | 'right'
        }}
      >
        {text}
      </a>
    </div>
  );
};

export default ButtonBlock; 