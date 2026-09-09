import React from 'react';
import { WCRFormData, WCRValidationErrors } from '../../types/wcr';
import { INITIAL_WCR_FORM_DATA, WCR_FIXED_TEXT } from '../../config/wcrTemplate';
import { StringTableSection } from './StringTableSection';
import {
  Building2,
  ListChecks,
  Cpu,
  Zap,
  ShieldCheck,
  Activity,
  MessageSquare,
  FileSignature,
  RotateCcw,
} from 'lucide-react';

interface WCRFormProps {
  formData: WCRFormData;
  onChange: (data: WCRFormData) => void;
  errors: WCRValidationErrors;
}

export const WCRForm: React.FC<WCRFormProps> = ({ formData, onChange, errors }) => {
  const handleInputChange = (field: keyof WCRFormData, value: any) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handleNestedChange = (parent: 'phaseVoltages' | 'phaseCurrents', subKey: string, value: string) => {
    onChange({
      ...formData,
      [parent]: {
        ...formData[parent],
        [subKey]: value,
      },
    });
  };

  const handlePrefillSample = () => {
    onChange({
      ...INITIAL_WCR_FORM_DATA,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Sample Data Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Work Completion Report Details
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in the WCR commissioning details below. Scope of work remains fixed.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrefillSample}
          className="flex items-center text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-[#07833F]" />
          Prefill Sample Data (IVY Courtyard)
        </button>
      </div>

      {/* SECTION 1: Project Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Building2 className="w-4 h-4" />
          <span>1. Project Details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              placeholder="e.g. Solar PV System Installation at Courtyard IVY Housing Society"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.projectName ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.projectName && <p className="text-xs text-rose-600 mt-1">{errors.projectName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Client Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              placeholder="e.g. Courtyard IVY CHS LTD."
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.clientName ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.clientName && <p className="text-xs text-rose-600 mt-1">{errors.clientName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Completion <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={formData.completionDate}
              onChange={(e) => handleInputChange('completionDate', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.completionDate ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.completionDate && <p className="text-xs text-rose-600 mt-1">{errors.completionDate}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Site Location <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.siteLocation}
              onChange={(e) => handleInputChange('siteLocation', e.target.value)}
              placeholder="Full site address"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.siteLocation ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.siteLocation && <p className="text-xs text-rose-600 mt-1">{errors.siteLocation}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Installed System Capacity <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.installedCapacity}
              onChange={(e) => handleInputChange('installedCapacity', e.target.value)}
              placeholder="e.g. 80 kWp (DC)"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.installedCapacity ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.installedCapacity && <p className="text-xs text-rose-600 mt-1">{errors.installedCapacity}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Inverter Capacity <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.inverterCapacity}
              onChange={(e) => handleInputChange('inverterCapacity', e.target.value)}
              placeholder="e.g. 80 kW (AC)"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.inverterCapacity ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.inverterCapacity && <p className="text-xs text-rose-600 mt-1">{errors.inverterCapacity}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Type of System <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.systemType}
              onChange={(e) => handleInputChange('systemType', e.target.value)}
              placeholder="e.g. On-Grid Solar PV System"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] ${errors.systemType ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.systemType && <p className="text-xs text-rose-600 mt-1">{errors.systemType}</p>}
          </div>
        </div>
      </div>



      {/* SECTION 3: System Configuration Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Cpu className="w-4 h-4" />
          <span>2. System Configuration Details</span>
        </div>

        {/* 3.1 Solar PV Modules */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Solar PV Modules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Make</label>
              <input
                type="text"
                value={formData.moduleMake}
                onChange={(e) => handleInputChange('moduleMake', e.target.value)}
                placeholder="e.g. Premier"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rated Capacity</label>
              <input
                type="text"
                value={formData.moduleRatedCap}
                onChange={(e) => handleInputChange('moduleRatedCap', e.target.value)}
                placeholder="e.g. 600 Wp per module"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total Quantity</label>
              <input
                type="text"
                value={formData.moduleQty}
                onChange={(e) => handleInputChange('moduleQty', e.target.value)}
                placeholder="e.g. 136 Nos."
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total DC Capacity</label>
              <input
                type="text"
                value={formData.moduleTotalDcCap}
                onChange={(e) => handleInputChange('moduleTotalDcCap', e.target.value)}
                placeholder="e.g. 81.6 kW"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Modules Serial Number</label>
              <input
                type="text"
                value={formData.modulesSerialNo}
                onChange={(e) => handleInputChange('modulesSerialNo', e.target.value)}
                placeholder="Optional serial number"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Inverter Serial Number</label>
              <input
                type="text"
                value={formData.inverterSerialNo}
                onChange={(e) => handleInputChange('inverterSerialNo', e.target.value)}
                placeholder="Optional serial number"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
          </div>
        </div>

        {/* 3.2 Inverter Details */}
        <div className="space-y-3 pt-3 border-t border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Inverter Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Make</label>
              <input
                type="text"
                value={formData.inverterMake}
                onChange={(e) => handleInputChange('inverterMake', e.target.value)}
                placeholder="e.g. Solis"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rated Capacity</label>
              <input
                type="text"
                value={formData.inverterRatedCap}
                onChange={(e) => handleInputChange('inverterRatedCap', e.target.value)}
                placeholder="e.g. 80 kW"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type</label>
              <input
                type="text"
                value={formData.inverterType}
                onChange={(e) => handleInputChange('inverterType', e.target.value)}
                placeholder="e.g. String Inverter"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: String Configuration Details & Tables */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Zap className="w-4 h-4" />
          <span>3. String Configuration & AC Measurements</span>
        </div>

        {/* Dynamic String Intro Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              DC Strings Count <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.dcStringsCount}
              onChange={(e) => handleInputChange('dcStringsCount', e.target.value)}
              className={`w-full px-3.5 py-2 rounded-lg bg-white border text-sm text-slate-900 focus:outline-none focus:border-[#07833F] ${errors.dcStringsCount ? 'border-rose-400' : 'border-slate-300'
                }`}
            />
            {errors.dcStringsCount && <p className="text-xs text-rose-600 mt-1">{errors.dcStringsCount}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Inverter Make for String Sentence
            </label>
            <input
              type="text"
              value={formData.stringInverterMake}
              onChange={(e) => handleInputChange('stringInverterMake', e.target.value)}
              placeholder="e.g. Solis"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Inverter Size for String Sentence
            </label>
            <input
              type="text"
              value={formData.stringInverterSize}
              onChange={(e) => handleInputChange('stringInverterSize', e.target.value)}
              placeholder="e.g. 110 kW"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>
        </div>

        {/* Dynamic String Measurement Table Component */}
        <StringTableSection
          dcStringsCount={formData.dcStringsCount}
          onDcStringsCountChange={(cnt) => handleInputChange('dcStringsCount', cnt)}
          rows={formData.stringRows}
          onRowsChange={(rows) => handleInputChange('stringRows', rows)}
        />

        {/* AC side Voltages and Current Tables */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#07833F]">
            AC Side Voltages & Currents
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phase Voltages */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Phase Voltages (V AC)</span>
              <div className="space-y-1.5 pt-2">
                {[
                  { key: 'ry', label: 'R-Y' },
                  { key: 'yb', label: 'Y-B' },
                  { key: 'br', label: 'B-R' },
                  { key: 'rpn', label: 'R-P-N' },
                  { key: 'ypn', label: 'Y-P-N' },
                  { key: 'bpn', label: 'B-P-N' },
                  { key: 'pe', label: 'P-E' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-slate-700 w-20">{label}:</span>
                    <input
                      type="text"
                      value={(formData.phaseVoltages as any)[key] || ''}
                      onChange={(e) => handleNestedChange('phaseVoltages', key, e.target.value)}
                      placeholder="Voltage reading"
                      className="flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Currents */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Phase Currents (I AC)</span>
              <div className="space-y-2 pt-2">
                {[
                  { key: 'rPhase', label: 'R phase' },
                  { key: 'yPhase', label: 'Y phase' },
                  { key: 'bPhase', label: 'B phase' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-slate-700 w-20">{label}:</span>
                    <input
                      type="text"
                      value={(formData.phaseCurrents as any)[key] || ''}
                      onChange={(e) => handleNestedChange('phaseCurrents', key, e.target.value)}
                      placeholder="Current reading"
                      className="flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Electrical Installation Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>4. Electrical Installation Details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">DC Cables</label>
            <input
              type="text"
              value={formData.dcCables}
              onChange={(e) => handleInputChange('dcCables', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">AC Cables</label>
            <input
              type="text"
              value={formData.acCables}
              onChange={(e) => handleInputChange('acCables', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">DCDB Installed</label>
            <input
              type="text"
              value={formData.dcdbInstalled}
              onChange={(e) => handleInputChange('dcdbInstalled', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">ACDB Installed</label>
            <input
              type="text"
              value={formData.acdbInstalled}
              onChange={(e) => handleInputChange('acdbInstalled', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">AC Isolator</label>
            <input
              type="text"
              value={formData.acIsolator}
              onChange={(e) => handleInputChange('acIsolator', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Earthing System</label>
            <input
              type="text"
              value={formData.earthingSystem}
              onChange={(e) => handleInputChange('earthingSystem', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lightning Arrester</label>
            <input
              type="text"
              value={formData.lightningArrester}
              onChange={(e) => handleInputChange('lightningArrester', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 6: Net Metering Status */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Activity className="w-4 h-4" />
          <span>5. Net Metering Status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Net Meter Application</label>
            <input
              type="text"
              value={formData.netMeterApp}
              onChange={(e) => handleInputChange('netMeterApp', e.target.value)}
              placeholder="e.g. Submitted"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Net Meter Installed</label>
            <input
              type="text"
              value={formData.netMeterInstalled}
              onChange={(e) => handleInputChange('netMeterInstalled', e.target.value)}
              placeholder="e.g. Yes"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Synchronization</label>
            <input
              type="date"
              value={formData.dateOfSync}
              onChange={(e) => handleInputChange('dateOfSync', e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Discom</label>
            <input
              type="text"
              value={formData.discom}
              onChange={(e) => handleInputChange('discom', e.target.value)}
              placeholder="e.g. MSEDCL"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meter Type-(Ratio)</label>
            <input
              type="text"
              value={formData.meterTypeRatio}
              onChange={(e) => handleInputChange('meterTypeRatio', e.target.value)}
              placeholder="Meter ratio details"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">CT-(Ratio)</label>
            <input
              type="text"
              value={formData.ctRatio}
              onChange={(e) => handleInputChange('ctRatio', e.target.value)}
              placeholder="CT ratio details"
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
            />
          </div>
        </div>
      </div>

      {/* SECTION 7: Client Remark & Sign-off Details */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-xs">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <MessageSquare className="w-4 h-4" />
          <span>6. Client Remark & Sign-off Details</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Client Remark</label>
          <textarea
            rows={3}
            value={formData.clientRemark}
            onChange={(e) => handleInputChange('clientRemark', e.target.value)}
            placeholder="Optional client remark notes"
            className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-[#07833F]"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center space-x-2 text-[#07833F] font-bold text-xs">
            <FileSignature className="w-3.5 h-3.5" />
            <span>Signatory Sign-off Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Signatory */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800">Company Sign-off (Minus CO2)</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.companySignatoryName}
                  onChange={(e) => handleInputChange('companySignatoryName', e.target.value)}
                  placeholder="Company official name"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.companySignatoryDesignation}
                  onChange={(e) => handleInputChange('companySignatoryDesignation', e.target.value)}
                  placeholder="Official designation"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                />
              </div>
            </div>

            {/* Client Signatory */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800">Client Sign-off</span>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Client Society Name</label>
                <input
                  type="text"
                  value={formData.clientSignatoryName || formData.clientName}
                  onChange={(e) => handleInputChange('clientSignatoryName', e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Client Official Name</label>
                <input
                  type="text"
                  value={formData.clientSignatoryDesignation}
                  onChange={(e) => handleInputChange('clientSignatoryDesignation', e.target.value)}
                  placeholder="Client official name / designation"
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
