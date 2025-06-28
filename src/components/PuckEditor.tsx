'use client';

import React, { useMemo, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Puck, Config } from '@measured/puck';
import { ElementorData, PuckData } from '../types';
import { JsonToPuckConverter } from '../converter/json-to-puck';
import HeadingBlock from './HeadingBlock';
import TextBlock from './TextBlock';
import ButtonBlock from './ButtonBlock';
import IconBlock from './IconBlock';
import '@measured/puck/puck.css';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

interface PuckEditorProps {
  elementorData: ElementorData;
  onPublish: (data: ElementorData) => void;
}

export interface PuckEditorRef {
  getCurrentData: () => PuckData;
  publish: () => void;
}

const PuckEditor = forwardRef<PuckEditorRef, PuckEditorProps>(({ elementorData, onPublish }, ref) => {
  const converter = useMemo(() => new JsonToPuckConverter(), []);
  const [currentPuckData, setCurrentPuckData] = useState<PuckData>(() => converter.convert(elementorData));
  
  useImperativeHandle(ref, () => ({
    getCurrentData: () => currentPuckData,
    publish: () => {
      const convertedElementorData = converter.convertBack(currentPuckData);
      onPublish(convertedElementorData);
    }
  }));

  const puckData = useMemo(() => {
    const converted = converter.convert(elementorData);
    setCurrentPuckData(converted); 
    return converted;
  }, [elementorData, converter]);

  const puckKey = useMemo(() => {
    return `puck-${JSON.stringify(elementorData).length}-${Date.now()}`;
  }, [elementorData]);

  const handlePuckPublish = (data: any) => {
    setCurrentPuckData(data);
    const convertedElementorData = converter.convertBack(data);
    onPublish(convertedElementorData);
  };

  const handlePuckChange = (data: any) => {
    setCurrentPuckData(data);
  };

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
    }
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col" >
      <main className="flex-1 h-full min-h-0 flex flex-col" >
        <Puck config={config} data={puckData} onPublish={handlePuckPublish} onChange={handlePuckChange} key={puckKey}>
          <div className="flex w-full h-full min-h-0 flex-col md:flex-row">
            {/* Components */}
            <aside className="w-72 min-w-[16rem] max-w-xs bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 flex flex-col !bg-white">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <WidgetsIcon className="text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-800">Components</h2>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto text-gray-800 !bg-white">
                <Puck.Components />
              </div>
            </aside>
            {/* Preview */}
            <section className="flex-1 min-w-0 flex flex-col items-stretch justify-stretch bg-white p-4 overflow-auto !bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Preview</h3>
              </div>
              <div className="flex-1 flex flex-col items-stretch justify-stretch bg-white !bg-white relative">
                <Puck.Preview />
              </div>
            </section>
            {/* Properties */}
            <aside className="w-80 min-w-[18rem] max-w-sm bg-white border-t md:border-t-0 md:border-l border-gray-200 p-4 flex flex-col !bg-white">
              <div className="flex items-center gap-2 mb-4">
                <SettingsIcon className="text-purple-600" />
                <h2 className="text-lg font-bold text-gray-800">Properties</h2>
              </div>
              <div className="flex-1 overflow-y-auto !bg-white">
                <Puck.Fields />
              </div>
            </aside>
          </div>
        </Puck>
      </main>
    </div>
  );
});

export default PuckEditor; 