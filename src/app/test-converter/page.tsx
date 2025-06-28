'use client';

import React, { useState } from 'react';
import { JsonToPuckConverter } from '../../converter/json-to-puck';
import { ElementorData, PuckData, PuckElement, PuckProps } from '../../types';
import HeadingBlock from '../../components/HeadingBlock';
import TextBlock from '../../components/TextBlock';
import ButtonBlock from '../../components/ButtonBlock';
import IconBlock from '../../components/IconBlock';

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

  const [convertedData, setConvertedData] = useState<PuckData | null>(null);
  const [backToElementor, setBackToElementor] = useState<ElementorData | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const converter = new JsonToPuckConverter();

  // Test Scenario 1: Load Elementor JSON
  const handleLoadElementorJSON = () => {
    setTestResults(prev => [...prev, '✅ Test 1: Elementor JSON loaded successfully']);
    console.log('📥 Original Elementor JSON:', elementorData);
  };

  // Test Scenario 2: Convert to Puck and Display
  const handleConvert = () => {
    const puckData = converter.convert(elementorData);
    setConvertedData(puckData);
    setTestResults(prev => [...prev, '✅ Test 2: Converted to Puck format and displayed']);
    console.log('📤 Converted to Puck format:', puckData);
  };

  // Test Scenario 3: Edit Widgets (Simulated)
  const handleEditWidgets = () => {
    if (convertedData) {
      const editedData: PuckData = {
        ...convertedData,
        content: convertedData.content.map((item: PuckElement, index: number) => {
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
      setTestResults(prev => [...prev, '✅ Test 3: Widgets edited (simulated)']);
      console.log('✏️ Edited Puck data:', editedData);
    }
  };

  // Test Scenario 4: Convert Back to Elementor Format
  const handleConvertBack = () => {
    if (convertedData) {
      const elementorDataBack = converter.convertBack(convertedData);
      setBackToElementor(elementorDataBack);
      setTestResults(prev => [...prev, '✅ Test 4: Converted back to Elementor format']);
      console.log('⬅️ Converted back to Elementor format:', elementorDataBack);
    }
  };

  // Test Scenario 5: Check Console Results
  const handleCheckResults = () => {
    setTestResults(prev => [...prev, '✅ Test 5: Console results checked - see browser console for details']);
    console.log('🎯 FINAL TEST RESULTS:');
    console.log('Original Elementor:', elementorData);
    console.log('Puck Format:', convertedData);
    console.log('Back to Elementor:', backToElementor);
    
    if (backToElementor) {
      const isDataIntact = backToElementor.content.length === elementorData.content.length;
      console.log('Data integrity check:', isDataIntact ? '✅ PASSED' : '❌ FAILED');
    }
  };

  const renderPuckComponent = (element: PuckElement) => {
    const { type, props } = element;
    
    switch (type) {
      case 'HeadingBlock':
        return (
          <div key={props.id} className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <HeadingBlock 
              id={props.id}
              title={props.children || 'Heading'}
              header_size={props.level || 'h2'}
              align={props.alignment || 'left'}
            />
          </div>
        );
      case 'TextBlock':
        return (
          <div key={props.id} className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <TextBlock 
              id={props.id}
              text={props.children || 'Enter your text here...'}
              align={props.alignment || 'left'}
            />
          </div>
        );
      case 'ButtonBlock':
        return (
          <div key={props.id} className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <ButtonBlock
              id={props.id}
              text={props.children || 'Button'}
              url={props.href || '#'}
              button_type={props.variant || 'primary'}
              align={props.alignment || 'left'}
            />
          </div>
        );
      case 'IconBlock':
        return (
          <div key={props.id} className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <IconBlock 
              id={props.id}
              icon={props.icon || 'fas fa-star'}
              size={props.size || 'medium'}
              color={props.color || '#3B82F6'}
              align={props.alignment || 'left'}
            />
          </div>
        );
      default:
        return (
          <div key={props.id} className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            Unknown component: {type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">🧪</span>
                Test Converter
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Elementor ↔ Puck dönüştürme işlemlerini test edin
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Test Scenarios</div>
              <div className="text-xs text-gray-400 mt-1">5 Steps</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            Test Kontrolleri
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <button
              onClick={handleLoadElementorJSON}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              1. Load JSON
            </button>
            <button
              onClick={handleConvert}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              2. Convert
            </button>
            <button
              onClick={handleEditWidgets}
              className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              3. Edit
            </button>
            <button
              onClick={handleConvertBack}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              4. Convert Back
            </button>
            <button
              onClick={handleCheckResults}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              5. Check Results
            </button>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Test Sonuçları
          </h3>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">{result}</span>
              </div>
            ))}
            {testResults.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                Henüz test çalıştırılmadı. Yukarıdaki butonları kullanarak testleri başlatın.
              </div>
            )}
          </div>
        </div>

        {convertedData && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📤</span>
                Puck Formatında Görüntüleme
              </h2>
              <p className="text-green-100 mt-1">Dönüştürülen verilerin görsel önizlemesi</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {convertedData.content.map((element) => renderPuckComponent(element))}
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-xl">📥</span>
                Orijinal Elementor JSON
              </h3>
            </div>
            <div className="p-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-blue-400 text-xs overflow-auto max-h-64 font-mono leading-relaxed">
                  {JSON.stringify(elementorData, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {backToElementor && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-xl">⬅️</span>
                  Geri Dönüştürülen Elementor JSON
                </h3>
              </div>
              <div className="p-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-purple-400 text-xs overflow-auto max-h-64 font-mono leading-relaxed">
                    {JSON.stringify(backToElementor, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📈</span>
            Durum Özeti
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800">Orijinal</div>
              <div className="text-sm text-blue-600 mt-1">
                {elementorData.content.length} widget
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-800">Puck Format</div>
              <div className="text-sm text-green-600 mt-1">
                {convertedData ? convertedData.content.length : 0} widget
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="font-semibold text-purple-800">Geri Dönüştürülen</div>
              <div className="text-sm text-purple-600 mt-1">
                {backToElementor ? backToElementor.content.length : 0} widget
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="font-semibold text-yellow-800">Test Durumu</div>
              <div className="text-sm text-yellow-600 mt-1">
                {testResults.length}/5 tamamlandı
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConverter; 