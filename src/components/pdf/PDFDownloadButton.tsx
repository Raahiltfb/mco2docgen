import React, { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { CODPdfDocument } from './CODPdfDocument';
import { CODFormData } from '../../types/document';
import { generatePdfFilename } from '../../utils/formatters';
import { Download, Loader2, FileCheck } from 'lucide-react';

interface PDFDownloadButtonProps {
  formData: CODFormData;
  disabled?: boolean;
  onBeforeDownload?: () => boolean;
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  formData,
  disabled = false,
  onBeforeDownload,
}) => {
  const [instance, updateInstance] = usePDF({
    document: <CODPdfDocument formData={formData} />,
  });

  useEffect(() => {
    updateInstance(<CODPdfDocument formData={formData} />);
  }, [formData, updateInstance]);

  const filename = generatePdfFilename(
    formData.clientName,
    formData.systemCapacity,
    formData.letterDate
  );

  const handleDownload = (e: React.MouseEvent) => {
    if (onBeforeDownload && !onBeforeDownload()) {
      e.preventDefault();
      return;
    }
    if (instance.url) {
      const link = document.createElement('a');
      link.href = instance.url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (disabled) {
    return (
      <button
        disabled
        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-200 text-slate-500 font-semibold text-xs cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        <span>Generate PDF Document</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={instance.loading}
      className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg font-semibold text-xs shadow-xs transition-all cursor-pointer ${
        instance.loading
          ? 'bg-slate-200 text-slate-500'
          : 'bg-[#07833F] hover:bg-[#056631] text-white shadow-sm'
      }`}
    >
      {instance.loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Preparing PDF...</span>
        </>
      ) : (
        <>
          <FileCheck className="w-4 h-4 text-white" />
          <span>Generate & Download PDF</span>
        </>
      )}
    </button>
  );
};
