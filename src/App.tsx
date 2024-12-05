import React from 'react';
import { Toaster } from 'react-hot-toast';
import ContentGenerator from './components/ContentGenerator';
import { Wand2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wand2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Content Generator
              </h1>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-6">
        <ContentGenerator />
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'rounded-lg shadow-lg',
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
        }} 
      />
    </div>
  );
}

export default App;