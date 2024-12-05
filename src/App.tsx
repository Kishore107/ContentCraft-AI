import React from 'react';
import ContentGenerator from './components/ContentGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center">
            <img src="/logo.svg" alt="ContentCraft AI" className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">ContentCraft AI</span>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-8">
        <ContentGenerator />
      </main>
    </div>
  );
}

export default App;