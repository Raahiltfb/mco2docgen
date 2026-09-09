import React from 'react';
import { WCRFormData } from '../../types/wcr';
import { WCR_FIXED_TEXT } from '../../config/wcrTemplate';
import { formatDateDMY } from '../../utils/formatters';

interface WCRDocumentViewProps {
  formData: WCRFormData;
}

const WcrFooter: React.FC = () => (
  <footer className="w-full pt-3 border-t border-slate-300 mt-auto text-center font-sans">
    <p className="font-extrabold text-[9.5pt] text-gray-900 tracking-wider mb-0.5">
      MINUS CO2 ENERGY PVT LTD.
    </p>
    <p className="text-[8pt] text-gray-700 leading-tight">
      Corporate Office: Hermes Atrium, Office No.309, Plot No.57, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra - 400 614.
    </p>
    <p className="text-[8pt] text-gray-800 font-medium tracking-tight mt-0.5">
      www.minusco2.in | info@minusco2.in | 022 4976 6944
    </p>
  </footer>
);

export const WCRDocumentView: React.FC<WCRDocumentViewProps> = ({ formData }) => {
  const formattedCompletionDate = formatDateDMY(formData.completionDate);
  const formattedSyncDate = formatDateDMY(formData.dateOfSync);

  return (
    <div className="flex flex-col items-center justify-start space-y-8 py-4 w-full select-text">
      {/* PAGE 1 */}
      <div className="a4-page shadow-2xl rounded-sm border border-slate-200">
        <div>
          {/* Header Bar & Logo */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-56 h-2.5 bg-[#07833F] rounded-r-full"></div>
            <img
              src="/minusco2_logo.jpg"
              alt="Minus CO2"
              className="h-10 object-contain"
            />
          </div>

          {/* Document Title */}
          <h1 className="text-center text-[13pt] font-extrabold tracking-wide uppercase text-gray-900 mb-6 border-b border-gray-200 pb-2">
            {WCR_FIXED_TEXT.documentTitle}
          </h1>

          {/* 1. Project Details */}
          <div className="mb-6 space-y-2 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900 mb-2">1. Project Details</h2>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Project Name:</span>
                <span>{formData.projectName || '____________________________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Client Name:</span>
                <span>{formData.clientName || '____________________________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2 shrink-0">• Site Location:</span>
                <span>{formData.siteLocation || '____________________________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Installed System Capacity:</span>
                <span>{formData.installedCapacity || '________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Inverter Capacity:</span>
                <span>{formData.inverterCapacity || '________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Type of System:</span>
                <span>{formData.systemType || '________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Date of Completion:</span>
                <span className="font-semibold underline decoration-slate-400 min-w-[200px] inline-block">
                  {formattedCompletionDate || '____________________________________'}
                </span>
              </li>
            </ul>
          </div>

          {/* 2. Scope of Work */}
          <div className="mb-6 space-y-2 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900 mb-1">2. Scope of Work</h2>
            <p className="leading-relaxed mb-2">{WCR_FIXED_TEXT.scopeOfWorkIntro}</p>
            <ul className="space-y-1 pl-4">
              {WCR_FIXED_TEXT.scopeOfWorkBullets.map((bullet, i) => (
                <li key={i} className="flex items-baseline">
                  <span className="mr-2 text-gray-700">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. System Configuration Details */}
          <div className="mb-4 space-y-3 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900">3. System Configuration Details</h2>
            
            {/* 3.1 Solar PV Modules */}
            <div className="pl-2 space-y-1">
              <h3 className="font-bold text-[10.5pt]">3.1 Solar PV Modules</h3>
              <ul className="space-y-1 pl-3">
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Make:</span>
                  <span>{formData.moduleMake || 'Premier'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Rated Capacity:</span>
                  <span>{formData.moduleRatedCap || '600 Wp per module'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Total Quantity:</span>
                  <span>{formData.moduleQty || '136 Nos.'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Total DC Capacity:</span>
                  <span>{formData.moduleTotalDcCap || '81.6 kW'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">Modules Serial Number:</span>
                  <span>{formData.modulesSerialNo || '____________________'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">Inverter Serial Number:</span>
                  <span>{formData.inverterSerialNo || '____________________'}</span>
                </li>
              </ul>
            </div>

            {/* 3.2 Inverter Details */}
            <div className="pl-2 space-y-1 pt-2">
              <h3 className="font-bold text-[10.5pt]">3.2 Inverter Details</h3>
              <ul className="space-y-1 pl-3">
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Make:</span>
                  <span>{formData.inverterMake || 'Solis'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Rated Capacity:</span>
                  <span>{formData.inverterRatedCap || '80 kW'}</span>
                </li>
                <li className="flex items-baseline">
                  <span className="font-bold mr-2">• Type:</span>
                  <span>{formData.inverterType || 'String Inverter'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <WcrFooter />
      </div>

      {/* PAGE 2 */}
      <div className="a4-page shadow-2xl rounded-sm border border-slate-200">
        <div>
          {/* Header Bar & Logo */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-56 h-2.5 bg-[#07833F] rounded-r-full"></div>
            <img
              src="/minusco2_logo.jpg"
              alt="Minus CO2"
              className="h-10 object-contain"
            />
          </div>

          {/* 4. String Configuration Details */}
          <div className="mb-6 space-y-3 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900">4. String Configuration Details</h2>
            <p className="leading-relaxed text-justify">
              {WCR_FIXED_TEXT.stringConfigSentence(
                formData.dcStringsCount,
                formData.stringInverterMake,
                formData.stringInverterSize
              )}
            </p>

            {/* String Voltages & Current Details Table */}
            <div className="mt-3 border border-black">
              <p className="font-bold text-[10pt] p-1.5 border-b border-black bg-gray-50">
                String voltages and Current details
              </p>
              <table className="w-full text-left text-[9pt] border-collapse">
                <thead>
                  <tr className="border-b border-black font-bold bg-gray-100">
                    <th className="p-1.5 border-r border-black w-14">String No.</th>
                    <th className="p-1.5 border-r border-black">MPPT NO</th>
                    <th className="p-1.5 border-r border-black">Time</th>
                    <th className="p-1.5 border-r border-black">No. of Modules</th>
                    <th className="p-1.5 border-r border-black">String Voltage (V DC)</th>
                    <th className="p-1.5">String Current (I DC)</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.stringRows && formData.stringRows.length > 0 ? (
                    formData.stringRows.map((row) => (
                      <tr key={row.id} className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-black text-center font-bold">{row.stringNo}</td>
                        <td className="p-1.5 border-r border-black">{row.mpptNo || '—'}</td>
                        <td className="p-1.5 border-r border-black">{row.time || '—'}</td>
                        <td className="p-1.5 border-r border-black">{row.noOfModules || '—'}</td>
                        <td className="p-1.5 border-r border-black">{row.stringVoltage || '—'}</td>
                        <td className="p-1.5">{row.stringCurrent || '—'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-gray-400 italic">No string readings entered.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* AC Side Voltages and Current */}
          <div className="mb-4 space-y-3 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900">AC side Voltages and current</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* Phase Voltages Table */}
              <div className="border border-black">
                <table className="w-full text-left text-[9pt] border-collapse">
                  <thead>
                    <tr className="border-b border-black font-bold bg-gray-100">
                      <th className="p-1.5 border-r border-black w-28">Phase</th>
                      <th className="p-1.5">Voltages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'ry', label: 'R-Y' },
                      { key: 'yb', label: 'Y-B' },
                      { key: 'br', label: 'B-R' },
                      { key: 'rpn', label: 'R-P-N' },
                      { key: 'ypn', label: 'Y-P-N' },
                      { key: 'bpn', label: 'B-P-N' },
                      { key: 'pe', label: 'P-E' },
                    ].map(({ key, label }) => (
                      <tr key={key} className="border-b border-gray-300">
                        <td className="p-1.5 border-r border-black font-medium">{label}</td>
                        <td className="p-1.5">{(formData.phaseVoltages as any)[key] || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phase Current Table Part 1 */}
              <div className="border border-black">
                <table className="w-full text-left text-[9pt] border-collapse">
                  <thead>
                    <tr className="border-b border-black font-bold bg-gray-100">
                      <th className="p-1.5 border-r border-black w-28">Phase</th>
                      <th className="p-1.5">Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="p-1.5 border-r border-black font-medium">R phase</td>
                      <td className="p-1.5">{formData.phaseCurrents.rPhase || ''}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="p-1.5 border-r border-black font-medium">Y phase</td>
                      <td className="p-1.5">{formData.phaseCurrents.yPhase || ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <WcrFooter />
      </div>

      {/* PAGE 3 */}
      <div className="a4-page shadow-2xl rounded-sm border border-slate-200">
        <div>
          {/* Header Bar & Logo */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-56 h-2.5 bg-[#07833F] rounded-r-full"></div>
            <img
              src="/minusco2_logo.jpg"
              alt="Minus CO2"
              className="h-10 object-contain"
            />
          </div>

          {/* Phase Current B phase continuation */}
          <div className="mb-6 max-w-sm">
            <div className="border border-black">
              <table className="w-full text-left text-[9pt] border-collapse">
                <tbody>
                  <tr>
                    <td className="p-1.5 border-r border-black font-medium w-28">B phase</td>
                    <td className="p-1.5">{formData.phaseCurrents.bPhase || ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Electrical Installation Details */}
          <div className="mb-6 space-y-2 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900 mb-2">5. Electrical Installation Details</h2>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• DC Cables:</span>
                <span>{formData.dcCables || 'As per approved design and inverter specifications'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• AC Cables:</span>
                <span>{formData.acCables || 'As per load and utility standards'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• DCDB Installed:</span>
                <span>{formData.dcdbInstalled || 'Yes'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• ACDB Installed:</span>
                <span>{formData.acdbInstalled || 'Yes'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• AC Isolator:</span>
                <span>{formData.acIsolator || 'Provided'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Earthing System:</span>
                <span>{formData.earthingSystem || 'Provided for modules, inverter, and panels'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Lightning Arrester:</span>
                <span>{formData.lightningArrester || 'Installed'}</span>
              </li>
            </ul>
          </div>

          {/* 6. Net Metering Status */}
          <div className="mb-6 space-y-2 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900 mb-2">6. Net Metering Status</h2>
            <ul className="space-y-1.5 pl-2">
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Net Meter Application:</span>
                <span>{formData.netMeterApp || 'Submitted'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Net Meter Installed:</span>
                <span>{formData.netMeterInstalled || '☐ Yes'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Date of Synchronization:</span>
                <span>{formattedSyncDate || '_________________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Discom-</span>
                <span>{formData.discom || '____________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• Meter Type-(Ratio)</span>
                <span>{formData.meterTypeRatio || '____________________'}</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-bold mr-2">• CT-(Ratio)</span>
                <span>{formData.ctRatio || '____________________'}</span>
              </li>
            </ul>
          </div>

          {/* 7. Client Remark */}
          <div className="mb-8 space-y-2 text-[10.5pt] text-gray-900">
            <h2 className="font-bold text-[11pt] text-gray-900 mb-2">7. Client Remark</h2>
            {formData.clientRemark ? (
              <p className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-800 leading-relaxed whitespace-pre-wrap">
                {formData.clientRemark}
              </p>
            ) : (
              <div className="space-y-3 pt-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border-b border-dotted border-gray-400 w-full h-4"></div>
                ))}
              </div>
            )}
          </div>

          {/* Sign-off Header Row */}
          <div className="grid grid-cols-2 gap-8 text-[10.5pt] text-gray-900 pt-4">
            <div>
              <p className="font-semibold">Company name- {formData.companyName || 'MinusCO2 Energy Pvt.Ltd.'}</p>
              <p className="mt-4">Name- {formData.companySignatoryName || '…………………………………………'}</p>
              <p className="mt-4">Designation- {formData.companySignatoryDesignation || '…………………………………………'}</p>
            </div>
            <div>
              <p className="font-semibold">Client- {formData.clientSignatoryName || formData.clientName || 'Courtyard IVY Housing Society'}</p>
              <p className="mt-4">Name- {formData.clientSignatoryDesignation || '…………………………………………'}</p>
              <p className="mt-4">Designation- …………………………………………</p>
            </div>
          </div>
        </div>

        <WcrFooter />
      </div>

      {/* PAGE 4 */}
      <div className="a4-page shadow-2xl rounded-sm border border-slate-200">
        <div>
          {/* Header Bar & Logo */}
          <div className="flex items-start justify-between mb-12">
            <div className="w-56 h-2.5 bg-[#07833F] rounded-r-full"></div>
            <img
              src="/minusco2_logo.jpg"
              alt="Minus CO2"
              className="h-10 object-contain"
            />
          </div>

          {/* Signatures Row */}
          <div className="grid grid-cols-2 gap-8 text-[10.5pt] text-gray-900 pt-8">
            <div>
              <p className="font-medium">Signature-…………………………………………</p>
            </div>
            <div>
              <p className="font-medium">Signature-…………………………………………</p>
            </div>
          </div>
        </div>

        <WcrFooter />
      </div>
    </div>
  );
};
