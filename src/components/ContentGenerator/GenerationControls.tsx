import React from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContentType, GenerationOptions } from '../../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { styleOptions, toneOptions } from '../../lib/utils';

interface GenerationControlsProps {
  contentType: ContentType;
  onGenerate: (options: GenerationOptions) => void;
  disabled?: boolean;
}

export default function GenerationControls({
  contentType,
  onGenerate,
  disabled = false,
}: GenerationControlsProps) {
  const [style, setStyle] = React.useState('');
  const [tone, setTone] = React.useState('');

  const currentStyleOptions = styleOptions[contentType];
  const currentToneOptions = toneOptions[contentType];

  const handleGenerate = () => {
    onGenerate({
      contentType,
      prompt: '',
      style,
      tone,
    });
  };

  return (
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
          disabled={disabled}
        >
          {styleOptions[contentType].map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={disabled}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white font-medium hover:from-blue-700 hover:to-indigo-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 
          dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200"
      >
        Generate {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
      </button>
    </div>
  );
}