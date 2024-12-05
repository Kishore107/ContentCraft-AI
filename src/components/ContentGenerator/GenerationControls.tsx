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
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Style</label>
          <Select
            disabled={disabled}
            value={style}
            onValueChange={setStyle}
          >
            <SelectTrigger className="w-full h-11 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
              {currentStyleOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tone</label>
          <Select
            disabled={disabled}
            value={tone}
            onValueChange={setTone}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {currentToneOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        disabled={disabled}
        className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
      >
        <Wand2 className="w-5 h-5 mr-2" />
        Generate {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
      </motion.button>
    </motion.div>
  );
}