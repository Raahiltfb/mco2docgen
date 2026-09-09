import React from 'react';
import { ArrowRight, FileText, LucideIcon } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  isAvailable: boolean;
  onClick: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  isAvailable,
  onClick,
}) => {
  return (
    <div
      onClick={isAvailable ? onClick : undefined}
      className={`rounded-xl border p-6 flex flex-col justify-between transition-all ${
        isAvailable
          ? 'bg-white border-slate-200 hover:border-[#07833F] hover:shadow-md cursor-pointer group'
          : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isAvailable
                ? 'bg-[#07833F]/10 text-[#07833F]'
                : 'bg-slate-200 text-slate-500'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>

          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
              isAvailable
                ? 'bg-[#07833F]/10 text-[#07833F]'
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            {isAvailable ? 'Active' : 'Not Implemented'}
          </span>
        </div>

        <h3
          className={`text-lg font-bold mb-1 ${
            isAvailable ? 'text-slate-900 group-hover:text-[#07833F]' : 'text-slate-600'
          }`}
        >
          {title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          {subtitle}
        </p>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        <span className={isAvailable ? 'text-[#07833F]' : 'text-slate-400'}>
          {isAvailable ? 'Open Generator' : 'Unavailable'}
        </span>
        {isAvailable && (
          <ArrowRight className="w-4 h-4 text-[#07833F] group-hover:translate-x-1 transition-transform" />
        )}
      </div>
    </div>
  );
};
