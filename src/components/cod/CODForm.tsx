import React from 'react';
import { CODFormData, FormValidationErrors } from '../../types/document';
import { ISSUING_COMPANY_OPTIONS } from '../../config/companyProfiles';
import { INITIAL_FORM_DATA } from '../../config/codTemplate';
import { MeterSection } from './MeterSection';
import {
  Building2,
  Calendar,
  UserCheck,
  Zap,
  Building,
  RotateCcw,
} from 'lucide-react';

interface CODFormProps {
  formData: CODFormData;
  onChange: (data: CODFormData) => void;
  errors: FormValidationErrors;
}

export const CODForm: React.FC<CODFormProps> = ({ formData, onChange, errors }) => {
  const handleInputChange = (field: keyof CODFormData, value: any) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handlePrefillSample = () => {
    onChange({
      ...INITIAL_FORM_DATA,
      letterDate: formData.letterDate,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Prefill Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            COD Intimation Details
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in the document fields below.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrefillSample}
          className="flex items-center text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-[#07833F]" />
          Prefill Sample Data
        </button>
      </div>

      {/* SECTION 1: Client / Recipient */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Building2 className="w-4 h-4" />
          <span>1. Client Information</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client / Society Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              placeholder="e.g. Society/Client Name"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.clientName ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.clientName && <p className="text-xs text-rose-600 mt-1">{errors.clientName}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client Address <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.clientAddress}
              onChange={(e) => handleInputChange('clientAddress', e.target.value)}
              placeholder="Address details"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.clientAddress ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.clientAddress && <p className="text-xs text-rose-600 mt-1">{errors.clientAddress}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 2: Project Specs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Zap className="w-4 h-4" />
          <span>2. System & Project Details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              System Capacity (kWp) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.systemCapacity}
                onChange={(e) => handleInputChange('systemCapacity', e.target.value)}
                placeholder="71.98"
                className={`w-full pl-3.5 pr-12 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.systemCapacity ? 'border-rose-400' : 'border-slate-300'
                  }`}
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-[#07833F]">
                kWp
              </span>
            </div>
            {errors.systemCapacity && <p className="text-xs text-rose-600 mt-1">{errors.systemCapacity}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Building / Wing <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.building}
              onChange={(e) => handleInputChange('building', e.target.value)}
              placeholder="e.g. D-Wing"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.building ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.building && <p className="text-xs text-rose-600 mt-1">{errors.building}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phase <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phase}
              onChange={(e) => handleInputChange('phase', e.target.value)}
              placeholder="e.g. Phase 2"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.phase ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.phase && <p className="text-xs text-rose-600 mt-1">{errors.phase}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 3: Joint Reading Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>3. Joint Reading Details</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jointReadingPersonName}
              onChange={(e) => handleInputChange('jointReadingPersonName', e.target.value)}
              placeholder="e.g. Kinnari Koppikar"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.jointReadingPersonName ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.jointReadingPersonName && (
              <p className="text-xs text-rose-600 mt-1">{errors.jointReadingPersonName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Energy Provider <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.energyProvider}
              onChange={(e) => handleInputChange('energyProvider', e.target.value)}
              placeholder="e.g. Adani"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.energyProvider ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.energyProvider && <p className="text-xs text-rose-600 mt-1">{errors.energyProvider}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Joint Reading Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.jointReadingDate}
              onChange={(e) => handleInputChange('jointReadingDate', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.jointReadingDate ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.jointReadingDate && (
              <p className="text-xs text-rose-600 mt-1">{errors.jointReadingDate}</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4: Dynamic Meters */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <MeterSection
          meters={formData.generationMeters}
          onChange={(meters) => handleInputChange('generationMeters', meters)}
          errors={errors}
        />
        {errors.generationMeters && (
          <p className="text-xs text-rose-600 mt-2 font-medium">{errors.generationMeters}</p>
        )}
      </div>

      {/* SECTION 5: Billing Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Calendar className="w-4 h-4" />
          <span>5. Billing Schedule</span>
        </div>

        <div className="max-w-md">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            First Reading for Billing Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            value={formData.firstBillingReadingDate}
            onChange={(e) => handleInputChange('firstBillingReadingDate', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.firstBillingReadingDate ? 'border-rose-400' : 'border-slate-300'
              }`}
          />
          {errors.firstBillingReadingDate && (
            <p className="text-xs text-rose-600 mt-1">{errors.firstBillingReadingDate}</p>
          )}
        </div>
      </div>

      {/* SECTION 6: Issuing Entity & Signatory */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Building className="w-4 h-4" />
          <span>6. Issuing Company & Signatory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Issuing Company <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.issuingCompany}
              onChange={(e) => handleInputChange('issuingCompany', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.issuingCompany ? 'border-rose-400' : 'border-slate-300'
                }`}
            >
              {ISSUING_COMPANY_OPTIONS.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            {errors.issuingCompany && (
              <p className="text-xs text-rose-600 mt-1">{errors.issuingCompany}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Signatory Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.signatoryName}
              onChange={(e) => handleInputChange('signatoryName', e.target.value)}
              placeholder="e.g. AKSHAY PATIL."
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.signatoryName ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.signatoryName && (
              <p className="text-xs text-rose-600 mt-1">{errors.signatoryName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Signatory Designation <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.signatoryDesignation}
              onChange={(e) => handleInputChange('signatoryDesignation', e.target.value)}
              placeholder="e.g. Manager - Accounts & Administration."
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${errors.signatoryDesignation ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.signatoryDesignation && (
              <p className="text-xs text-rose-600 mt-1">{errors.signatoryDesignation}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
