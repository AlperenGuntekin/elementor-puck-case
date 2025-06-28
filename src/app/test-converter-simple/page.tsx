'use client';

import React, { useState, useRef } from 'react';
import { JsonToPuckConverter } from '../../converter/json-to-puck';
import { ElementorData, PuckData } from '../../types';
import HeadingBlock from '../../components/HeadingBlock';
import TextBlock from '../../components/TextBlock';
import ButtonBlock from '../../components/ButtonBlock';
import { Alert, Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

const TestConverter: React.FC = () => {
  const [elementorData, setElementorData] = useState<ElementorData>({
    content: [
      {
        id: "3ab5483",
        settings: {
          title: "What we do",
          header_size: "h6" as const,
          align: "left" as const
        },
        widgetType: "heading",
        elType: "widget"
      },
      {
        id: "2ab32d24",
        settings: {
          title: "We build awesome themes",
          header_size: "h2" as const,
          align: "left" as const
        },
        widgetType: "heading",
        elType: "widget"
      },
      {
        id: "6475a8c5",
        settings: {
          text: "Learn more",
          url: "#",
          button_type: "primary" as const
        },
        widgetType: "button",
        elType: "widget"
      },
      {
        id: "166beb3",
        settings: {
          selected_icon: {
            value: "fas fa-star-of-life"
          },
          size: "md" as const,
          color: "primary" as const,
          align: "left" as const
        },
        widgetType: "icon",
        elType: "widget"
      },
      {
        id: "5388efac",
        settings: {
          editor: "Habitant faucibus sollicitudin fames...",
          align: "left" as const
        },
        widgetType: "text-editor",
        elType: "widget"
      }
    ],
    title: "Test Page"
  });

  const [convertedData, setConvertedData] = useState<PuckData | null>(null);
  const [backToElementor, setBackToElementor] = useState<ElementorData | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const converter = new JsonToPuckConverter();

  const getMuiIcon = (iconName: string) => {
    switch (iconName) {
      case 'StarIcon': return <StarIcon />;
      case 'HomeIcon': return <HomeIcon />;
      case 'FavoriteIcon': return <FavoriteIcon />;
      case 'SettingsIcon': return <SettingsIcon />;
      case 'PersonIcon': return <PersonIcon />;
      case 'SearchIcon': return <SearchIcon />;
      case 'MenuIcon': return <MenuIcon />;
      case 'CloseIcon': return <CloseIcon />;
      case 'AddIcon': return <AddIcon />;
      case 'EditIcon': return <EditIcon />;
      case 'DeleteIcon': return <DeleteIcon />;
      case 'CheckIcon': return <CheckIcon />;
      case 'WarningIcon': return <WarningIcon />;
      case 'InfoIcon': return <InfoIcon />;
      case 'ErrorIcon': return <ErrorIcon />;
      default: return <StarIcon />;
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          
          if (!json.content || !Array.isArray(json.content)) {
            showNotification('Invalid Elementor JSON structure! File must contain a &quot;content&quot; array.', 'error');
            return;
          }
          
          setElementorData(json);
          showNotification(`Elementor JSON loaded successfully! ${json.content.length} widgets found.`);
          
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch {
          showNotification('Invalid JSON file! Please check the file format.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleConvert = () => {
    const puckData = converter.convert(elementorData);
    setConvertedData(puckData);
    showNotification('Successfully converted to Puck format!');
    console.log('Converted to Puck format:', puckData);
  };

  const handleEditWidgets = () => {
    if (convertedData) {
      const editedData: PuckData = {
        ...convertedData,
        content: convertedData.content.map((item, index) => {
          if (item.type === 'HeadingBlock' && index === 0) {
            return {
              ...item,
              props: {
                ...item.props,
                children: 'What we do - EDITED'
              }
            };
          }
          if (item.type === 'TextBlock') {
            return {
              ...item,
              props: {
                ...item.props,
                children: 'Habitant faucibus sollicitudin fames... - EDITED TEXT'
              }
            };
          }
          if (item.type === 'ButtonBlock') {
            return {
              ...item,
              props: {
                ...item.props,
                children: 'Learn more - EDITED'
              }
            };
          }
          return item;
        })
      };
      setConvertedData(editedData);
      showNotification('Widgets edited successfully!');
      console.log('Edited Puck data:', editedData);
    }
  };

  const handleConvertBack = () => {
    if (convertedData) {
      const elementorDataBack = converter.convertBack(convertedData);
      setBackToElementor(elementorDataBack);
      showNotification('Successfully converted back to Elementor format!');
      console.log('Converted back to Elementor format:', elementorDataBack);
    }
  };

  const handleCheckResults = () => {
    if (backToElementor) {
      const isDataIntact = backToElementor.content.length === elementorData.content.length;
      const message = isDataIntact 
        ? 'Data integrity check: PASSED' 
        : 'Data integrity check: FAILED';
      showNotification(message, isDataIntact ? 'success' : 'error');
      
      console.log('FINAL TEST RESULTS:');
      console.log('Original Elementor:', elementorData);
      console.log('Puck Format:', convertedData);
      console.log('Back to Elementor:', backToElementor);
    } else {
      showNotification('Please complete all conversion steps first.', 'info');
    }
  };

  const renderPuckComponent = (element: { type: string; props: Record<string, unknown> }): React.ReactNode => {
    const { type, props } = element;
    
    switch (type) {
      case 'HeadingBlock':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <HeadingBlock 
              id={props.id as string}
              title={props.children as string || 'Heading'}
              header_size={(props.level as string || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
              align={(props.alignment as string || 'left') as 'left' | 'center' | 'right'}
            />
          </div>
        );
      case 'TextBlock':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <TextBlock 
              id={props.id as string}
              text={props.children as string || 'Enter your text here...'}
              align={(props.alignment as string || 'left') as 'left' | 'center' | 'right'}
            />
          </div>
        );
      case 'ButtonBlock':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <ButtonBlock
              id={props.id as string}
              text={props.children as string || 'Button'}
              url={props.href as string || '#'}
              button_type={(props.variant as string || 'primary') as 'primary' | 'secondary' | 'outline'}
              align={(props.alignment as string || 'left') as 'left' | 'center' | 'right'}
            />
          </div>
        );
      case 'IconBlock':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-yellow-800">Icon:</span>
              <span className="text-sm text-gray-600">{props.icon as string || 'StarIcon'}</span>
            </div>
            <div 
              className={`inline-block ${props.size === 'small' ? 'text-2xl' : props.size === 'large' ? 'text-6xl' : 'text-4xl'}`}
              style={{ 
                color: props.color as string || '#3B82F6',
                textAlign: (props.alignment as string || 'left') as 'left' | 'center' | 'right'
              }}
            >
              {getMuiIcon(props.icon as string || 'StarIcon')}
            </div>
          </div>
        );
      case 'Container':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="font-semibold text-indigo-800 mb-2">Container</div>
            <div className="space-y-2">
              {(props.content as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                <div key={index} className="ml-4">
                  {renderPuckComponent(child)}
                </div>
              ))}
            </div>
          </div>
        );
      case 'TwoColumn':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="font-semibold text-orange-800 mb-2">Two Column Layout</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="text-sm font-medium text-gray-600 mb-2">Left Column:</div>
                <div className="space-y-2">
                  {(props.leftColumn as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                    <div key={index}>
                      {renderPuckComponent(child)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm font-medium text-gray-600 mb-2">Right Column:</div>
                <div className="space-y-2">
                  {(props.rightColumn as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                    <div key={index}>
                      {renderPuckComponent(child)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'ThreeColumn':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <div className="font-semibold text-pink-800 mb-2">Three Column Layout</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="text-sm font-medium text-gray-600 mb-2">Left Column:</div>
                <div className="space-y-2">
                  {(props.leftColumn as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                    <div key={index}>
                      {renderPuckComponent(child)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm font-medium text-gray-600 mb-2">Center Column:</div>
                <div className="space-y-2">
                  {(props.centerColumn as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                    <div key={index}>
                      {renderPuckComponent(child)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm font-medium text-gray-600 mb-2">Right Column:</div>
                <div className="space-y-2">
                  {(props.rightColumn as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                    <div key={index}>
                      {renderPuckComponent(child)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Grid':
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
            <div className="font-semibold text-teal-800 mb-2">Grid Layout ({String(props.columns || 3)} columns)</div>
            <div className="grid md:grid-cols-3 gap-4">
              {(props.content as Array<{ type: string; props: Record<string, unknown> }> | undefined)?.map((child: { type: string; props: Record<string, unknown> }, index: number) => (
                <div key={index} className="bg-white p-3 rounded border">
                  {renderPuckComponent(child)}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div key={props.id as string} className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <div className="font-semibold">Unknown component: {type}</div>
            <div className="text-sm mt-1">Props: {JSON.stringify(props, null, 2)}</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elementor to Puck Converter Test
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test the bidirectional conversion between Elementor JSON and Puck Editor format
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Elementor JSON</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-gray-600">or use the default test data below</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Steps</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={handleConvert}
              className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              1. Convert to Puck
            </button>
            <button
              onClick={handleEditWidgets}
              disabled={!convertedData}
              className="px-6 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              2. Edit Widgets
            </button>
            <button
              onClick={handleConvertBack}
              disabled={!convertedData}
              className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              3. Convert Back
            </button>
            <button
              onClick={handleCheckResults}
              className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              4. Check Results
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Elementor JSON</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-auto max-h-80 font-mono">
              {JSON.stringify(elementorData, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Puck Preview</h3>
            {convertedData ? (
              <div className="space-y-4">
                {convertedData.content.map((element, index) => (
                  <div key={index}>
                    {renderPuckComponent(element as { type: string; props: Record<string, unknown> })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Click &quot;Convert to Puck&quot; to see the preview</p>
              </div>
            )}
          </div>
        </div>

        {backToElementor && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Converted Back to Elementor</h3>
            <pre className="bg-gray-900 text-purple-400 p-4 rounded-lg text-xs overflow-auto max-h-80 font-mono">
              {JSON.stringify(backToElementor, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Summary</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800">Original</div>
              <div className="text-sm text-blue-600 mt-1">
                {elementorData.content.length} widgets
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-800">Puck Format</div>
              <div className="text-sm text-green-600 mt-1">
                {convertedData ? convertedData.content.length : 0} widgets
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="font-semibold text-purple-800">Converted Back</div>
              <div className="text-sm text-purple-600 mt-1">
                {backToElementor ? backToElementor.content.length : 0} widgets
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="font-semibold text-yellow-800">Test Status</div>
              <div className="text-sm text-yellow-600 mt-1">
                {backToElementor ? 'Completed' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>

        <Snackbar
          open={!!notification}
          autoHideDuration={4000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity={notification?.type || 'success'}
            icon={notification?.type === 'success' ? <CheckCircleIcon /> : notification?.type === 'error' ? <ErrorIcon /> : <InfoIcon />}
            sx={{ width: '100%' }}
          >
            {notification?.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default TestConverter; 