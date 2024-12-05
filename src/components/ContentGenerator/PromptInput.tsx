import React from 'react';
import { ContentType } from '../../types';

interface PromptInputProps {
  contentType: ContentType;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function PromptInput({
  contentType,
  value,
  onChange,
  disabled = false,
}: PromptInputProps) {
  const placeholders = {
    text: 'Enter your prompt for text generation...',
    image: 'Describe the image you want to generate...',
    voice: 'Enter the text you want to convert to speech...',
  };

  return (
    <div className="space-y-2">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
        Prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          rows={4}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none transition-shadow duration-200"
          placeholder={placeholders[contentType]}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {value.length} / 1000
        </div>
      </div>
    </div>
  );
}