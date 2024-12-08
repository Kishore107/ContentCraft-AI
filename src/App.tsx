import React from 'react';
import ContentGenerator from './components/ContentGenerator';
import { Wand2, HelpCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Wand2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ContentCraft AI
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Content Generation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                Sign In
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ContentGenerator />
      </main>
    </div>
  );
}

export default App;