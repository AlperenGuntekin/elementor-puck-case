'use client';

import React, { useState } from 'react';
import { ElementorData } from '../../types';
import PuckEditor from '@/components/PuckEditor';

const initialElementorData: ElementorData = {
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
};

const EditorPage: React.FC = () => {
  const [elementorData, setElementorData] = useState<ElementorData>(initialElementorData);
  const [publishedElementor, setPublishedElementor] = useState<ElementorData | null>(null);

  const handlePublish = (data: ElementorData) => {
    setPublishedElementor(data);
    console.log('✅ Elementor verisi başarıyla dönüştürüldü:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">🎨</span>
                Puck Editor
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Elementor içeriğini interaktif olarak düzenleyin ve tekrar Elementor formatına çevirin
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Elementor → Puck → Elementor</div>
              <div className="text-xs text-gray-400 mt-1">Bidirectional Conversion</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Nasıl Kullanılır
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-semibold text-gray-800">Sol panelden widget'ları sürükleyin</div>
                <div>Heading, Text, Button, Icon bileşenlerini kullanabilirsiniz</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-semibold text-gray-800">Sağ panelden özellikleri düzenleyin</div>
                <div>Metin, renk, boyut ve diğer ayarları değiştirin</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-semibold text-gray-800">Publish butonuna tıklayın</div>
                <div>Düzenlenen içerik Elementor formatına dönüştürülecek</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">✏️</span>
              Puck Editor
            </h2>
            <p className="text-blue-100 mt-1">Elementor verilerinizi burada düzenleyin</p>
          </div>
          <div className="p-4">
            <PuckEditor elementorData={elementorData} onPublish={handlePublish} />
          </div>
        </div>

        {publishedElementor && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Yayınlanan Elementor JSON
              </h2>
              <p className="text-green-100 mt-1">Düzenlenen içeriğin tekrar Elementor formatına dönüştürülmüş hali</p>
            </div>
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400 font-semibold">Elementor JSON Output</div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(publishedElementor, null, 2))}
                    className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                  >
                    📋 Kopyala
                  </button>
                </div>
                <pre className="text-yellow-400 text-sm overflow-auto max-h-96 font-mono leading-relaxed">
                  {JSON.stringify(publishedElementor, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Durum
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800">Giriş Verisi</div>
              <div className="text-sm text-blue-600 mt-1">
                {elementorData.content.length} widget yüklendi
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-800">Çıkış Verisi</div>
              <div className="text-sm text-green-600 mt-1">
                {publishedElementor ? `${publishedElementor.content.length} widget dönüştürüldü` : 'Henüz yayınlanmadı'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage; 