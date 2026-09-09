import React from 'react';
import { StringRow } from '../../types/wcr';
import { Plus, Trash2, Layers } from 'lucide-react';

interface StringTableSectionProps {
  dcStringsCount: string;
  onDcStringsCountChange: (count: string) => void;
  rows: StringRow[];
  onRowsChange: (rows: StringRow[]) => void;
}

export const StringTableSection: React.FC<StringTableSectionProps> = ({
  dcStringsCount,
  onDcStringsCountChange,
  rows,
  onRowsChange,
}) => {
  const handleCountChange = (countStr: string) => {
    onDcStringsCountChange(countStr);
    const count = parseInt(countStr.trim(), 10);
    if (!isNaN(count) && count > 0) {
      if (rows.length < count) {
        // Add missing rows
        const newRows = [...rows];
        for (let i = rows.length; i < count; i++) {
          newRows.push({
            id: `string-${Date.now()}-${i + 1}`,
            stringNo: i + 1,
            mpptNo: `${Math.floor(i / 2) + 1}`,
            time: '12:30 PM',
            noOfModules: '17',
            stringVoltage: '',
            stringCurrent: '',
          });
        }
        onRowsChange(newRows);
      } else if (rows.length > count) {
        // Trim rows to count
        onRowsChange(rows.slice(0, count));
      }
    }
  };

  const handleRowChange = (index: number, field: keyof StringRow, value: string) => {
    const updated = rows.map((r, i) => {
      if (i === index) {
        return { ...r, [field]: value };
      }
      return r;
    });
    onRowsChange(updated);
  };

  const handleAddRow = () => {
    const newCount = rows.length + 1;
    onDcStringsCountChange(String(newCount));
    onRowsChange([
      ...rows,
      {
        id: `string-${Date.now()}-${newCount}`,
        stringNo: newCount,
        mpptNo: `${Math.floor((newCount - 1) / 2) + 1}`,
        time: '12:30 PM',
        noOfModules: '17',
        stringVoltage: '',
        stringCurrent: '',
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return;
    const filtered = rows.filter((_, i) => i !== index);
    const renumbered = filtered.map((r, i) => ({ ...r, stringNo: i + 1 }));
    onDcStringsCountChange(String(renumbered.length));
    onRowsChange(renumbered);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div className="flex items-center space-x-2 text-[#07833F] font-bold text-sm">
          <Layers className="w-4 h-4" />
          <span>String Voltage & Current Readings</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-700">
              Total DC Strings:
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={dcStringsCount}
              onChange={(e) => handleCountChange(e.target.value)}
              className="w-16 px-2.5 py-1 text-center rounded bg-white border border-slate-300 text-sm font-bold text-[#07833F] focus:outline-none focus:ring-2 focus:ring-[#07833F]/20 focus:border-[#07833F]"
            />
          </div>

          <button
            type="button"
            onClick={handleAddRow}
            className="flex items-center text-xs font-semibold px-2.5 py-1.5 rounded bg-[#07833F]/10 hover:bg-[#07833F]/20 text-[#07833F] border border-[#07833F]/30 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add String
          </button>
        </div>
      </div>

      {/* String Measurement Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-2.5 w-16 text-center">String #</th>
              <th className="p-2.5 w-24">MPPT NO</th>
              <th className="p-2.5 w-28">Time</th>
              <th className="p-2.5 w-28">No. of Modules</th>
              <th className="p-2.5">Voltage (V DC)</th>
              <th className="p-2.5">Current (I DC)</th>
              <th className="p-2.5 w-12 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, index) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="p-2 text-center font-bold text-[#07833F]">
                  {row.stringNo}
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.mpptNo}
                    onChange={(e) => handleRowChange(index, 'mpptNo', e.target.value)}
                    placeholder="MPPT 1"
                    className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.time}
                    onChange={(e) => handleRowChange(index, 'time', e.target.value)}
                    placeholder="12:30 PM"
                    className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.noOfModules}
                    onChange={(e) => handleRowChange(index, 'noOfModules', e.target.value)}
                    placeholder="17"
                    className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.stringVoltage}
                    onChange={(e) => handleRowChange(index, 'stringVoltage', e.target.value)}
                    placeholder="e.g. 650 V"
                    className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.stringCurrent}
                    onChange={(e) => handleRowChange(index, 'stringCurrent', e.target.value)}
                    placeholder="e.g. 12.5 A"
                    className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#07833F]"
                  />
                </td>
                <td className="p-2 text-center">
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                      title="Delete row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
