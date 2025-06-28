import React from 'react';

interface TextBlockProps {
  id: string;
  text: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ 
  id, 
  text, 
  align = 'left',
  className = ''
}) => {
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
      data-puck-type="TextBlock"
    >
      <div 
        className="text-lg leading-relaxed text-gray-800 prose prose-lg max-w-none"
        style={{ 
          textAlign: align as 'left' | 'center' | 'right'
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default TextBlock; 