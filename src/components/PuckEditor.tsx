'use client';

import React, { useMemo } from 'react';
import { Puck, Config } from '@measured/puck';
import { ElementorData, PuckData } from '../types';
import { JsonToPuckConverter } from '../converter/json-to-puck';
import HeadingBlock from './HeadingBlock';
import TextBlock from './TextBlock';
import ButtonBlock from './ButtonBlock';
import IconBlock from './IconBlock';
import '@measured/puck/puck.css';

interface PuckEditorProps {
  elementorData: ElementorData;
  onPublish: (data: ElementorData) => void;
}

const PuckEditor: React.FC<PuckEditorProps> = ({ elementorData, onPublish }) => {
  const converter = useMemo(() => new JsonToPuckConverter(), []);

  // Convert Elementor data to Puck format
  const initialPuckData = useMemo(() => {
    return converter.convert(elementorData);
  }, [elementorData, converter]);

  // Puck configuration
  const config: Config = {
    components: {
      HeadingBlock: {
        label: 'Heading',
        fields: {
          children: {
            type: 'text',
            label: 'Text',
            placeholder: 'Enter heading...'
          },
          level: {
            type: 'select',
            label: 'Level',
            options: [
              { label: 'H1', value: 'h1' },
              { label: 'H2', value: 'h2' },
              { label: 'H3', value: 'h3' },
              { label: 'H4', value: 'h4' },
              { label: 'H5', value: 'h5' },
              { label: 'H6', value: 'h6' }
            ]
          },
          alignment: {
            type: 'select',
            label: 'Alignment',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' }
            ]
          }
        },
        defaultProps: {
          children: 'Heading text',
          level: 'h2',
          alignment: 'left'
        },
        render: (props) => (
          <HeadingBlock
            id={props.id || 'heading'}
            title={props.children || 'Heading text'}
            header_size={props.level || 'h2'}
            align={props.alignment || 'left'}
          />
        )
      },
      TextBlock: {
        label: 'Text',
        fields: {
          children: {
            type: 'textarea',
            label: 'Content',
            placeholder: 'Enter text...'
          },
          alignment: {
            type: 'select',
            label: 'Alignment',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' }
            ]
          }
        },
        defaultProps: {
          children: 'Type your text here...',
          alignment: 'left'
        },
        render: (props) => (
          <TextBlock
            id={props.id || 'text'}
            text={props.children || 'Type your text here...'}
            align={props.alignment || 'left'}
          />
        )
      },
      ButtonBlock: {
        label: 'Button',
        fields: {
          children: {
            type: 'text',
            label: 'Label',
            placeholder: 'Button label'
          },
          href: {
            type: 'text',
            label: 'URL',
            placeholder: 'https://...'
          },
          variant: {
            type: 'select',
            label: 'Style',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Secondary', value: 'secondary' },
              { label: 'Outline', value: 'outline' }
            ]
          },
          size: {
            type: 'select',
            label: 'Size',
            options: [
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' }
            ]
          },
          alignment: {
            type: 'select',
            label: 'Alignment',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' }
            ]
          }
        },
        defaultProps: {
          children: 'Click me',
          href: '#',
          variant: 'primary',
          size: 'medium',
          alignment: 'left'
        },
        render: (props) => (
          <ButtonBlock
            id={props.id || 'button'}
            text={props.children || 'Click me'}
            url={props.href || '#'}
            button_type={props.variant || 'primary'}
            size={props.size || 'medium'}
            align={props.alignment || 'left'}
          />
        )
      },
      IconBlock: {
        label: 'Icon',
        fields: {
          icon: {
            type: 'text',
            label: 'Icon class',
            placeholder: 'e.g. fas fa-star'
          },
          size: {
            type: 'select',
            label: 'Size',
            options: [
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' }
            ]
          },
          color: {
            type: 'text',
            label: 'Color (HEX)',
            placeholder: '#3B82F6'
          },
          alignment: {
            type: 'select',
            label: 'Alignment',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' }
            ]
          }
        },
        defaultProps: {
          icon: 'fas fa-star',
          size: 'medium',
          color: '#3B82F6',
          alignment: 'left'
        },
        render: (props) => (
          <IconBlock
            id={props.id || 'icon'}
            icon={props.icon || 'fas fa-star'}
            size={props.size || 'medium'}
            color={props.color || '#3B82F6'}
            align={props.alignment || 'left'}
          />
        )
      }
    },
    categories: {
      typography: {
        title: 'Typography',
        components: ['HeadingBlock', 'TextBlock']
      },
      interactive: {
        title: 'Interactive',
        components: ['ButtonBlock', 'IconBlock']
      }
    },
    root: {
      render: ({ children }) => (
        <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-200 min-h-[400px]">
          {children}
        </div>
      )
    }
  };

  const handlePublish = (data: any) => {
    // Adapt Puck's data shape to your converter's expected shape
    const puckData = {
      ...data,
      root: {
        title: data.root?.props?.title || ''
      }
    };
    const elementorData = converter.convertBack(puckData);
    onPublish(elementorData);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <header className="py-8 px-12 bg-white border-b border-gray-200 shadow flex items-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mr-4">Puck Editor Example</h1>
        <span className="text-2xl">🎨</span>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <Puck config={config} data={initialPuckData} onPublish={handlePublish}>
          <div className="flex w-full h-full">
            {/* Sidebar: Components */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🧩</span> Components
              </h2>
              <div className="flex-1 overflow-y-auto">
                <Puck.Components />
              </div>
            </aside>
            {/* Main Preview */}
            <section className="flex-1 flex flex-col items-stretch justify-stretch bg-gray-50 p-8 overflow-auto">
              <div className="flex-1 flex flex-col items-stretch justify-stretch">
                <Puck.Preview />
              </div>
            </section>
            {/* Sidebar: Properties */}
            <aside className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">⚙️</span> Properties
              </h2>
              <div className="flex-1 overflow-y-auto">
                <Puck.Fields />
              </div>
            </aside>
          </div>
        </Puck>
      </main>
    </div>
  );
};

export default PuckEditor; 