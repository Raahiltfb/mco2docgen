import React, { useState } from 'react';
import { CODFormData, FormValidationErrors } from '../../types/document';
import { INITIAL_FORM_DATA } from '../../config/codTemplate';
import { validateCODForm } from '../../utils/validation';
import { CODForm } from './CODForm';
import { CODDocumentView } from '../preview/CODDocumentView';
import { PDFDownloadButton } from '../pdf/PDFDownloadButton';
import { Edit3, Eye, Printer, AlertTriangle, CheckCircle2, Columns } from 'lucide-react';

export const CODGeneratorView: React.FC = () => {
  const [formData, setFormData] = useState<CODFormData>({
    ...INITIAL_FORM_DATA,
    letterDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [viewMode, setViewMode] = useState<'form' | 'preview' | 'split'>('form');
  const [showValidationBanner, setShowValidationBanner] = useState(false);

  const handleFormChange = (data: CODFormData) => {
    setFormData(data);
    if (Object.keys(errors).length > 0) {
      const newErrors = validateCODForm(data);
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setShowValidationBanner(false);
      }
    }
  };

  const handleValidate = (): boolean => {
    const validationErrors = validateCODForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setShowValidationBanner(true);
      return false;
    }
    setShowValidationBanner(false);
    return true;
  };

  const handlePrint = () => {
    if (handleValidate()) {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Controls Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        {/* View Mode Toggle Buttons */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('form')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-md font-semibold text-xs transition-all cursor-pointer ${
              viewMode === 'form'
                ? 'bg-white text-[#07833F] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Form</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 rounded-md font-semibold text-xs transition-all cursor-pointer ${
              viewMode === 'preview'
                ? 'bg-white text-[#07833F] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden xl:flex items-center justify-center space-x-1.5 px-4 py-2 rounded-md font-semibold text-xs transition-all cursor-pointer ${
              viewMode === 'split'
                ? 'bg-white text-[#07833F] shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Side by Side Split View"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print View</span>
          </button>

          <PDFDownloadButton
            formData={formData}
            onBeforeDownload={handleValidate}
          />
        </div>
      </div>

      {/* Validation Error Banner */}
      {showValidationBanner && Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 no-print">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-sm text-amber-900 mb-1">
              Please fix the following validation errors:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-amber-800">
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Success Status Banner */}
      {!showValidationBanner && Object.keys(errors).length === 0 && (
        <div className="mb-6 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#07833F] text-xs flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#07833F]" />
            <span className="font-semibold">Ready for PDF generation.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 hidden md:inline">
            Filename: COD_Intimation_{formData.clientName ? formData.clientName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 15) : 'Client'}_...pdf
          </span>
        </div>
      )}

      {/* Main View Layouts */}
      {/* 1. Form Mode (Default: Full width, spacious, un-cramped) */}
      {viewMode === 'form' && (
        <div className="max-w-4xl mx-auto no-print">
          <CODForm
            formData={formData}
            onChange={handleFormChange}
            errors={errors}
          />
        </div>
      )}

      {/* 2. Preview Mode (Full Centered A4 Preview) */}
      {viewMode === 'preview' && (
        <div className="w-full flex justify-center py-2">
          <CODDocumentView formData={formData} />
        </div>
      )}

      {/* 3. Split Mode (Side by Side on Wide Screens) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-6 no-print">
            <CODForm
              formData={formData}
              onChange={handleFormChange}
              errors={errors}
            />
          </div>
          <div className="xl:col-span-6 w-full overflow-x-auto">
            <div className="sticky top-20">
              <CODDocumentView formData={formData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
