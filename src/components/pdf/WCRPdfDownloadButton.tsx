import React, { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { WCRPdfDocument } from './WCRPdfDocument';
import { WCRFormData } from '../../types/wcr';
import { generateWcrPdfFilename } from '../../utils/formatters';
import { Download, Loader2, FileCheck } from 'lucide-react';

interface WCRPdfDownloadButtonProps {
  formData: WCRFormData;
  disabled?: boolean;
  onBeforeDownload?: () => boolean;
}

export const WCRPdfDownloadButton: React.FC<WCRPdfDownloadButtonProps> = ({
  formData,
  disabled = false,
  onBeforeDownload,
}) => {
  const [instance, updateInstance] = usePDF({
    document: <WCRPdfDocument formData={formData} />,
  });

  useEffect(() => {
    updateInstance(<WCRPdfDocument formData={formData} />);
  }, [formData, updateInstance]);

  const filename = generateWcrPdfFilename(
    formData.clientName,
    formData.installedCapacity,
    formData.completionDate
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
        <span>Generate WCR PDF</span>
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
          <span>Generate & Download WCR PDF</span>
        </>
      )}
    </button>
  );
};
