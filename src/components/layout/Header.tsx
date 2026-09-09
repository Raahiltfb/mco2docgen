import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'cod-generator' | 'wcr-generator';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs px-4 sm:px-8 py-3.5 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentView !== 'dashboard' && (
            <button
              onClick={onNavigateHome}
              className="flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer border border-slate-200"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 text-[#07833F]" />
              Dashboard
            </button>
          )}

          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onNavigateHome}
          >
            <img
              src="/minusco2_logo.jpg"
              alt="Minus CO2"
              className="h-8 object-contain"
            />
            <div className="h-5 w-px bg-slate-200"></div>
            <span className="text-sm font-semibold text-slate-700 tracking-tight">
              Document Generator
            </span>
          </div>
        </div>

        {currentView === 'cod-generator' && (
          <span className="text-xs font-medium text-[#07833F] bg-[#07833F]/10 border border-[#07833F]/20 px-3 py-1 rounded-md">
            COD Intimation Letter
          </span>
        )}

        {currentView === 'wcr-generator' && (
          <span className="text-xs font-medium text-[#07833F] bg-[#07833F]/10 border border-[#07833F]/20 px-3 py-1 rounded-md">
            Work Completion Report
          </span>
        )}
      </div>
    </header>
  );
};
