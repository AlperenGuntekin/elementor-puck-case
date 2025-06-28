'use client';

import React, { useState, useRef } from 'react';
import { Button, Alert, Collapse } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PublishIcon from '@mui/icons-material/Publish';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SettingsIcon from '@mui/icons-material/Settings';
import PuckEditor, { PuckEditorRef } from '../../components/PuckEditor';
import { ElementorData } from '../../types';

const EditorPage: React.FC = () => {
  const [elementorData, setElementorData] = useState<ElementorData>({
    title: 'Test Page',
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
  });

  const [publishedElementor, setPublishedElementor] = useState<ElementorData | null>(null);
  const [showAlert, setShowAlert] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const puckEditorRef = useRef<PuckEditorRef>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePublish = (data: ElementorData) => {
    setPublishedElementor(data);
    setShowAlert('Content published successfully!');
    setTimeout(() => setShowAlert(''), 3000);
    
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = () => {
    if (publishedElementor) {
      navigator.clipboard.writeText(JSON.stringify(publishedElementor, null, 2));
      setShowAlert('JSON copied to clipboard!');
      setTimeout(() => setShowAlert(''), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        if (!json.content || !Array.isArray(json.content)) {
          setUploadError('Invalid Elementor JSON structure! File must contain a "content" array.');
          return;
        }
        
        const validWidgets = json.content.filter((item: unknown) => 
          item && typeof item === 'object' && 
          (item as Record<string, unknown>).widgetType && (item as Record<string, unknown>).settings
        );
        
        if (validWidgets.length === 0) {
          setUploadError('No valid widgets found in the JSON file!');
          return;
        }
        
        setElementorData(json);
        setUploadError('');
        setShowAlert(`Elementor JSON loaded successfully! ${validWidgets.length} widgets found.`);
        setTimeout(() => setShowAlert(''), 3000);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch {
        setUploadError('Invalid JSON file! Please check the file format.');
      }
    };
    reader.onerror = () => {
      setUploadError('Error reading file! Please try again.');
    };
    reader.readAsText(file);
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
                Edit your Elementor data interactively and convert it back to Elementor format
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
        <Collapse in={!!showAlert}>
          {showAlert && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {showAlert}
            </Alert>
          )}
        </Collapse>
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <div className="font-semibold text-gray-800">Drag components from the left panel</div>
                <div>Use Layout, Typography, and Interactive components</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <div className="font-semibold text-gray-800">Edit properties from the right panel</div>
                <div>Change text, layout settings, colors and other properties</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <div className="font-semibold text-gray-800">Click the Publish button</div>
                <div>The edited content will be converted back to Elementor format</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            color="primary"
          >
            Upload Elementor JSON
            <input
              type="file"
              accept="application/json"
              hidden
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
          </Button>
          <Collapse in={!!uploadError}>
            {uploadError && (
              <Alert severity="error" sx={{ ml: 2 }}>
                {uploadError}
              </Alert>
            )}
          </Collapse>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✏️</span>
                <h2 className="text-xl font-bold text-white">Puck Editor</h2>
              </div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
                onClick={() => {
                  puckEditorRef.current?.publish();
                }}
                sx={{
                  backgroundColor: 'white',
                  color: '#3B82F6',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  }
                }}
              >
                Publish
              </Button>
            </div>
          </div>
          <div className="p-4">
            <PuckEditor ref={puckEditorRef} elementorData={elementorData} onPublish={handlePublish} />
          </div>
        </div>

        {publishedElementor && (
          <div
            ref={outputRef}
            className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">✅</span>
                Published Elementor JSON
              </h2>
              <p className="text-green-100 mt-1">The edited content converted back to Elementor format</p>
            </div>
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400 font-semibold">Elementor JSON Output</div>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
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
            <WidgetsIcon className="text-blue-600" />
            Input Data
          </h3>
          <div className="text-sm text-blue-600 mt-1">
            {elementorData.content.length} widgets loaded
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 mt-6">
            <SettingsIcon className="text-green-600" />
            Output Data
          </h3>
          <div className="text-sm text-green-600 mt-1">
            {publishedElementor ? `${publishedElementor.content.length} widgets converted` : 'Not published yet'}
          </div>
        </div>

        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={6}
          placeholder="Paste your Elementor JSON here"
          onBlur={(e) => {
            try {
              const json = JSON.parse(e.target.value);
              setElementorData(json);
              setShowAlert('Elementor JSON loaded!');
            } catch {
              setShowAlert('Invalid JSON!');
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage; 