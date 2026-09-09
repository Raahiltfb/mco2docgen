import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { CODGeneratorView } from './components/cod/CODGeneratorView';
import { WCRGeneratorView } from './components/wcr/WCRGeneratorView';

export function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'cod-generator' | 'wcr-generator'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentView={currentView}
        onNavigateHome={() => setCurrentView('dashboard')}
      />

      <main className="flex-1">
        {currentView === 'dashboard' && (
          <Dashboard
            onSelectCOD={() => setCurrentView('cod-generator')}
            onSelectWCR={() => setCurrentView('wcr-generator')}
          />
        )}
        {currentView === 'cod-generator' && <CODGeneratorView />}
        {currentView === 'wcr-generator' && <WCRGeneratorView />}
      </main>

      {/* Corporate App Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-3.5 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Minus CO2. All rights reserved.</p>
          <p className="text-slate-400">Document Generator Internal Tool</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
