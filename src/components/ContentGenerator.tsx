import React, { useState } from 'react';
import { Settings, Type, Image, Mic, Loader2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import ContentGeneratorService from '../services/ContentGenerator';
import UserSettings from './UserSettings';

type ContentType = 'text' | 'image' | 'voice';

function ContentGenerator() {
  const [contentType, setContentType] = useState<ContentType>('text');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const contentTypes = [
    { type: 'text' as ContentType, icon: <Type className="w-5 h-5" />, label: 'Text' },
    { type: 'image' as ContentType, icon: <Image className="w-5 h-5" />, label: 'Image' },
    { type: 'voice' as ContentType, icon: <Mic className="w-5 h-5" />, label: 'Voice' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    try {
      const content = await ContentGeneratorService.generateContent({
        topic: prompt,
        contentType: contentType,
        tone: selectedStyle,
        targetAudience: 'general',
        length: 'medium'
      });
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (!generatedContent) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="mb-4">
            {contentType === 'text' && <Type className="w-12 h-12" />}
            {contentType === 'image' && <Image className="w-12 h-12" />}
            {contentType === 'voice' && <Mic className="w-12 h-12" />}
          </div>
          <p>Generated {contentType} content will appear here</p>
        </div>
      );
    }

    switch (contentType) {
      case 'image':
        return (
          <img 
            src={generatedContent} 
            alt="Generated content" 
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        );
      case 'voice':
        return (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <audio controls className="w-full">
              <source src={generatedContent} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="whitespace-pre-wrap">{generatedContent}</div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Content Generator
        </h1>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2.5 rounded-full hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <div className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex space-x-2 bg-gray-50 p-1.5 rounded-xl">
          {contentTypes.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200 ${
                contentType === type
                  ? 'bg-white text-blue-600 shadow-md transform scale-[1.02]'
                  : 'hover:bg-gray-100 text-gray-600'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {icon}
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-4 border rounded-xl resize-none focus:ring-2 
                focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              placeholder={`Enter your prompt for ${contentType} generation...`}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {prompt.length} / 1000
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 transition-shadow duration-200"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 
              text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5
              transition-all duration-200 font-medium ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Content'
            )}
          </button>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Generated Content</h2>
          <div className="rounded-xl bg-gray-50 overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>

      <Dialog 
        open={showSettings} 
        onClose={() => setShowSettings(false)}
        className="relative z-50"
      >
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
              <UserSettings 
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
              />
            </Dialog.Panel>
          </div>
        </>
      </Dialog>

      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Generating content...</p>
              <p className="text-sm text-gray-500">This may take a moment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentGenerator; 