import React from 'react';
import { format } from 'date-fns';
import { ContentType } from '../../types';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { Copy, Image } from 'lucide-react';

interface OutputDisplayProps {
  contentType: ContentType;
}

export default function OutputDisplay({ contentType }: OutputDisplayProps) {
  const { generatedContent } = useStore();
  const latestContent = generatedContent[0];

  const renderContent = (content: string, type: ContentType) => {
    switch (type) {
      case 'text':
        return <p className="whitespace-pre-wrap">{content}</p>;
      case 'image':
        return (
          <img
            src={content}
            alt="Generated content"
            className="max-w-full h-auto rounded-lg"
          />
        );
      case 'voice':
        return (
          <audio controls className="w-full">
            <source src={content} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
      {latestContent ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            {renderContent(latestContent.content, latestContent.type)}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Generated on{' '}
              {format(new Date(latestContent.timestamp), 'MMM d, yyyy HH:mm')}
            </span>
            <button
              onClick={() => {/* Add copy to clipboard functionality */}}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-8 flex flex-col items-center justify-center text-gray-500">
          <Image className="w-12 h-12 mb-4 text-gray-400" />
          <p className="text-center">
            Generated {contentType} content will appear here
          </p>
        </div>
      )}
    </div>
  );
}