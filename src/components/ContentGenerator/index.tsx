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
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          AI Content Generator
        </h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {showSettings && <UserSettings onClose={() => setShowSettings(false)} />}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex space-x-2 bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-xl">
            {contentTypes.map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg
                  transition-all duration-200 ${
                  contentType === type
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {icon}
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              className="w-full min-h-[120px] p-3 rounded-lg border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                placeholder-gray-400 dark:placeholder-gray-500
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                focus:border-blue-500 dark:focus:border-blue-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-shadow duration-200"
              placeholder={`Enter your prompt for ${contentType} generation...`}
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              {prompt.length} / 1000
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Style
              </label>
              <select
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                  focus:border-blue-500 dark:focus:border-blue-400
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
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
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                text-white font-medium hover:from-blue-700 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                focus:ring-offset-2 dark:focus:ring-offset-gray-800
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
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
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Generated Content
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 min-h-[100px] border border-gray-200 dark:border-gray-700">
              {/* Content will be rendered here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}