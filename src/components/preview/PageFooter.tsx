import React from 'react';
import { FIXED_CORPORATE_FOOTER } from '../../config/companyProfiles';

export const PageFooter: React.FC = () => {
  return (
    <footer className="w-full pt-4 border-t border-slate-200 mt-auto text-center font-sans">
      <p className="font-extrabold text-[10pt] text-gray-900 tracking-wider mb-0.5">
        {FIXED_CORPORATE_FOOTER.companyTitle}
      </p>
      <p className="text-[8.5pt] text-gray-700 leading-tight">
        {FIXED_CORPORATE_FOOTER.addressLine1}
      </p>
      <p className="text-[8.5pt] text-gray-700 leading-tight">
        {FIXED_CORPORATE_FOOTER.addressLine2}
      </p>
      <p className="text-[8.5pt] text-gray-800 font-medium tracking-tight mt-1">
        {FIXED_CORPORATE_FOOTER.contactLine}
      </p>
    </footer>
  );
};
