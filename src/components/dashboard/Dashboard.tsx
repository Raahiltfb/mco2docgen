import React from 'react';
import { DocumentCard } from './DocumentCard';
import { FileText, ClipboardList } from 'lucide-react';

interface DashboardProps {
  onSelectCOD: () => void;
  onSelectWCR: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectCOD, onSelectWCR }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Document Templates
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Select a template to generate official company documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: COD Intimation Letter */}
        <DocumentCard
          title="COD Intimation Letter"
          subtitle="Commercial Operational Date"
          description="Generate Commercial Operational Date intimation letter with joint reading records and meter details."
          icon={FileText}
          isAvailable={true}
          onClick={onSelectCOD}
        />

        {/* Card 2: Work Completion Report */}
        <DocumentCard
          title="Work Completion Report"
          subtitle="Project Completion"
          description="Generate Work Completion Report (WCR) with system configuration, string readings, and electrical specs."
          icon={ClipboardList}
          isAvailable={true}
          onClick={onSelectWCR}
        />
      </div>
    </div>
  );
};
