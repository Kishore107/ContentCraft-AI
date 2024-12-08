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
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Prompt
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
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
        {value.length} / 1000
      </div>
    </div>
  );
}