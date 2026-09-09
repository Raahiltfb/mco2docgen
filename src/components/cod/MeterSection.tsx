import React from 'react';
import { GenerationMeter, FormValidationErrors } from '../../types/document';
import { Plus, Trash2, Gauge } from 'lucide-react';

interface MeterSectionProps {
  meters: GenerationMeter[];
  onChange: (meters: GenerationMeter[]) => void;
  errors: FormValidationErrors;
}

export const MeterSection: React.FC<MeterSectionProps> = ({ meters, onChange, errors }) => {
  const handleAddMeter = () => {
    const newMeter: GenerationMeter = {
      id: `meter-${Date.now()}`,
      generationReading: '0.0 KWH',
      netImport: '',
      netExport: '',
    };
    onChange([...meters, newMeter]);
  };

  const handleRemoveMeter = (id: string) => {
    if (meters.length <= 1) return;
    onChange(meters.filter((m) => m.id !== id));
  };

  const handleMeterChange = (id: string, field: keyof GenerationMeter, value: string) => {
    const updated = meters.map((m) => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Gauge className="w-4 h-4" />
          <span>4. Generation & Net Meters ({meters.length})</span>
        </div>

        <button
          type="button"
          onClick={handleAddMeter}
          className="flex items-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#07833F]/10 hover:bg-[#07833F]/20 text-[#07833F] border border-[#07833F]/30 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Generation Meter
        </button>
      </div>

      <div className="space-y-4">
        {meters.map((meter, index) => {
          const genErr = errors[`meter_${index}_generation`];
          const impErr = errors[`meter_${index}_import`];
          const expErr = errors[`meter_${index}_export`];

          return (
            <div
              key={meter.id}
              className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#07833F]">
                  Meter {index + 1}
                </span>

                {meters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMeter(meter.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center px-2 py-1 rounded bg-rose-50 border border-rose-200 transition-all cursor-pointer"
                    title="Remove meter"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Generation Meter Reading */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Generation Reading <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={meter.generationReading}
                    onChange={(e) => handleMeterChange(meter.id, 'generationReading', e.target.value)}
                    placeholder="e.g. 0.0 KWH"
                    className={`w-full px-3.5 py-2 rounded-md bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${
                      genErr ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {genErr && <p className="text-[11px] text-rose-600 mt-1">{genErr}</p>}
                </div>

                {/* Net Meter Import */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Net Import Reading <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={meter.netImport}
                    onChange={(e) => handleMeterChange(meter.id, 'netImport', e.target.value)}
                    placeholder="e.g. 100"
                    className={`w-full px-3.5 py-2 rounded-md bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${
                      impErr ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {impErr && <p className="text-[11px] text-rose-600 mt-1">{impErr}</p>}
                </div>

                {/* Net Meter Export */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Net Export Reading <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={meter.netExport}
                    onChange={(e) => handleMeterChange(meter.id, 'netExport', e.target.value)}
                    placeholder="e.g. 50"
                    className={`w-full px-3.5 py-2 rounded-md bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F] transition-all ${
                      expErr ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {expErr && <p className="text-[11px] text-rose-600 mt-1">{expErr}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
