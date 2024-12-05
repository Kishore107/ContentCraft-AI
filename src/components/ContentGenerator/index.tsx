import React, { useState } from 'react';
import { Settings, Type, Image, Mic, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ContentType, GenerationOptions, GeneratedContent } from '../../types';
import { useStore } from '../../store/useStore';
import { generateText, generateImage, generateVoice } from '../../services/api';
import PromptInput from './PromptInput';
import GenerationControls from './GenerationControls';
import OutputDisplay from './OutputDisplay';
import UserSettings from './UserSettings';

export default function ContentGenerator() {
  const [contentType, setContentType] = useState<ContentType>('text');
  const [prompt, setPrompt] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const { addContent, isLoading, setLoading } = useStore();

  const contentTypes: { type: ContentType; icon: React.ReactNode; label: string }[] = [
    { type: 'text', icon: <Type className="w-5 h-5" />, label: 'Text' },
    { type: 'image', icon: <Image className="w-5 h-5" />, label: 'Image' },
    { type: 'voice', icon: <Mic className="w-5 h-5" />, label: 'Voice' },
  ];

  const handleGenerate = async (options: GenerationOptions) => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      let content: string;
      switch (contentType) {
        case 'text':
          content = await generateText({ ...options, prompt });
          break;
        case 'image':
          content = await generateImage({ ...options, prompt });
          break;
        case 'voice':
          content = await generateVoice({ ...options, prompt });
          break;
        default:
          throw new Error('Invalid content type');
      }

      const generatedContent: GeneratedContent = {
        id: crypto.randomUUID(),
        type: contentType,
        content,
        timestamp: new Date().toISOString(),
        metadata: { prompt, ...options },
      };

      addContent(generatedContent);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Create Content</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <Settings className="w-6 h-6 text-gray-600 hover:text-blue-600" />
        </button>
      </div>

      {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
            {contentTypes.map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md transition-all duration-200 ${
                  contentType === type
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'hover:bg-gray-100 text-gray-600'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <PromptInput
            contentType={contentType}
            value={prompt}
            onChange={setPrompt}
            disabled={isLoading}
          />
          
          <GenerationControls
            contentType={contentType}
            onGenerate={handleGenerate}
            disabled={isLoading}
          />
        </div>
        
        <div className="border-t border-gray-100">
          <OutputDisplay contentType={contentType} />
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity">
          <div className="bg-white p-6 rounded-xl shadow-xl flex items-center space-x-4">
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