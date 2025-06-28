import React from 'react';

interface HeadingBlockProps {
  id: string;
  title: string;
  header_size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ 
  id, 
  title, 
  header_size = 'h2', 
  align = 'left',
  className = ''
}) => {
  const getHeadingSize = (size: string) => {
    switch (size) {
      case 'h1': return 'text-4xl md:text-5xl font-bold';
      case 'h2': return 'text-3xl md:text-4xl font-bold';
      case 'h3': return 'text-2xl md:text-3xl font-semibold';
      case 'h4': return 'text-xl md:text-2xl font-semibold';
      case 'h5': return 'text-lg md:text-xl font-medium';
      case 'h6': return 'text-base md:text-lg font-medium';
      default: return 'text-2xl md:text-3xl font-semibold';
    }
  };

  const getAlignment = (alignment: string) => {
    switch (alignment) {
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const renderHeading = () => {
    const headingClass = `${getHeadingSize(header_size)} text-gray-900 leading-tight tracking-tight`;
    const style = { 
      textAlign: align as 'left' | 'center' | 'right',
      margin: 0,
      padding: 0
    };

    switch (header_size) {
      case 'h1':
        return <h1 className={headingClass} style={style}>{title}</h1>;
      case 'h2':
        return <h2 className={headingClass} style={style}>{title}</h2>;
      case 'h3':
        return <h3 className={headingClass} style={style}>{title}</h3>;
      case 'h4':
        return <h4 className={headingClass} style={style}>{title}</h4>;
      case 'h5':
        return <h5 className={headingClass} style={style}>{title}</h5>;
      case 'h6':
        return <h6 className={headingClass} style={style}>{title}</h6>;
      default:
        return <h2 className={headingClass} style={style}>{title}</h2>;
    }
  };

  return (
    <div 
      id={id}
      className={`mb-6 ${getAlignment(align)} ${className}`}
      data-puck-type="HeadingBlock"
    >
      {renderHeading()}
    </div>
  );
};

export default HeadingBlock; 