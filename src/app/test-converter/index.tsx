import ButtonBlock from '@/components/ButtonBlock';
import HeadingBlock from '@/components/HeadingBlock';
import IconBlock from '@/components/IconBlock';
import TextBlock from '@/components/TextBlock';
import { JsonToPuckConverter } from '@/converter/json-to-puck';
import { ElementorData } from '@/types';
import React, { useState } from 'react';


const TestConverter: React.FC = () => {
  const [elementorData, setElementorData] = useState<ElementorData>({
    content: [
      {
        id: "3ab5483",
        settings: {
          title: "What we do",
          header_size: "h6",
          align: "left"
        },
        widgetType: "heading",
        elType: "widget"
      },
      {
        id: "2ab32d24",
        settings: {
          title: "We build awesome themes",
          header_size: "h2",
          align: "left"
        },
        widgetType: "heading",
        elType: "widget"
      },
      {
        id: "6475a8c5",
        settings: {
          text: "Learn more"
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
          align: "left"
        },
        widgetType: "icon",
        elType: "widget"
      },
      {
        id: "5388efac",
        settings: {
          editor: "Habitant faucibus sollicitudin fames..."
        },
        widgetType: "text-editor",
        elType: "widget"
      }
    ],
    title: "Test Page"
  });

  const [convertedData, setConvertedData] = useState<any>(null);
  const [backToElementor, setBackToElementor] = useState<any>(null);

  const converter = new JsonToPuckConverter();

  const handleConvert = () => {
    const puckData = converter.convert(elementorData);
    setConvertedData(puckData);
    console.log('Converted to Puck format:', puckData);
  };

  const handleConvertBack = () => {
    if (convertedData) {
      const elementorDataBack = converter.convertBack(convertedData);
      setBackToElementor(elementorDataBack);
      console.log('Converted back to Elementor format:', elementorDataBack);
    }
  };

  const renderPuckComponent = (element: any) => {
    const { type, props } = element;
    
    switch (type) {
      case 'HeadingBlock':
        return <HeadingBlock key={props.id} {...props} />;
      case 'TextBlock':
        return <TextBlock key={props.id} {...props} />;
      case 'ButtonBlock':
        return <ButtonBlock key={props.id} {...props} />;
      case 'IconBlock':
        return <IconBlock key={props.id} {...props} />;
      default:
        return <div key={props.id}>Unknown component: {type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Elementor to Puck Converter Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Original Elementor Data</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(elementorData, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Converted Puck Data</h2>
            {convertedData ? (
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(convertedData, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Click "Convert to Puck" to see the converted data</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 my-8">
          <button
            onClick={handleConvert}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Convert to Puck
          </button>
          <button
            onClick={handleConvertBack}
            disabled={!convertedData}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Convert Back to Elementor
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Rendered Preview</h2>
          <div className="border rounded-lg p-6 bg-white">
            {convertedData?.content?.map(renderPuckComponent)}
          </div>
        </div>

        {backToElementor && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Converted Back to Elementor</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(backToElementor, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConverter;
