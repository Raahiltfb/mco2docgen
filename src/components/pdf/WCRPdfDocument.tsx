import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { WCRFormData } from '../../types/wcr';
import { WCR_FIXED_TEXT } from '../../config/wcrTemplate';
import { formatDateDMY } from '../../utils/formatters';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 65,
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    lineHeight: 1.45,
    color: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  greenBar: {
    width: 170,
    height: 7,
    backgroundColor: '#07833F',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  logo: {
    width: 140,
    height: 26,
    objectFit: 'contain',
  },
  docTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d1d5db',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
    marginTop: 8,
  },
  subHeading: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    marginTop: 4,
    paddingLeft: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletLabel: {
    fontFamily: 'Helvetica-Bold',
    marginRight: 4,
  },
  bulletValue: {
    flex: 1,
  },
  tableContainer: {
    marginTop: 6,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  tableTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#f3f4f6',
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  tableHeaderCell: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    padding: 3,
    borderRightWidth: 0.5,
    borderRightColor: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d1d5db',
  },
  tableCell: {
    fontSize: 8.5,
    padding: 3,
    borderRightWidth: 0.5,
    borderRightColor: '#000000',
  },
  twoColGrid: {
    flexDirection: 'row',
    justify: 'space-between',
    marginTop: 6,
  },
  halfTable: {
    width: '48%',
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  clientRemarkBox: {
    padding: 6,
    backgroundColor: '#f9fafb',
    borderWidth: 0.5,
    borderColor: '#d1d5db',
    borderRadius: 3,
    marginBottom: 10,
    fontSize: 9,
  },
  dottedLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#9ca3af',
    height: 14,
    marginBottom: 6,
  },
  signoffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signoffCol: {
    width: '48%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 45,
    right: 45,
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
    paddingTop: 6,
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 2,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 7.5,
    color: '#374151',
    lineHeight: 1.2,
    textAlign: 'center',
  },
});

interface WCRPdfDocumentProps {
  formData: WCRFormData;
  logoUrl?: string;
}

export const WCRPdfDocument: React.FC<WCRPdfDocumentProps> = ({ formData, logoUrl }) => {
  const formattedCompletionDate = formatDateDMY(formData.completionDate);
  const formattedSyncDate = formatDateDMY(formData.dateOfSync);

  const resolvedLogoUrl =
    logoUrl ||
    (typeof window !== 'undefined'
      ? `${window.location.origin}/minusco2_logo.jpg`
      : '/minusco2_logo.jpg');

  const voltageRows: Array<{ key: keyof typeof formData.phaseVoltages; label: string }> = [
    { key: 'ry', label: 'R-Y' },
    { key: 'yb', label: 'Y-B' },
    { key: 'br', label: 'B-R' },
    { key: 'rpn', label: 'R-P-N' },
    { key: 'ypn', label: 'Y-P-N' },
    { key: 'bpn', label: 'B-P-N' },
    { key: 'pe', label: 'P-E' },
  ];

  return (
    <Document title={`WCR_${formData.clientName || 'Report'}`}>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.greenBar} />
          <Image src={resolvedLogoUrl} style={styles.logo} />
        </View>

        <Text style={styles.docTitle}>{WCR_FIXED_TEXT.documentTitle}</Text>

        {/* 1. Project Details */}
        <Text style={styles.sectionHeading}>1. Project Details</Text>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Project Name:</Text>
          <Text style={styles.bulletValue}>{formData.projectName}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Client Name:</Text>
          <Text style={styles.bulletValue}>{formData.clientName}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Site Location:</Text>
          <Text style={styles.bulletValue}>{formData.siteLocation}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Installed System Capacity:</Text>
          <Text style={styles.bulletValue}>{formData.installedCapacity}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Inverter Capacity:</Text>
          <Text style={styles.bulletValue}>{formData.inverterCapacity}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Type of System:</Text>
          <Text style={styles.bulletValue}>{formData.systemType}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Date of Completion:</Text>
          <Text style={styles.bulletValue}>{formattedCompletionDate || '_______________________'}</Text>
        </View>

        {/* 2. Scope of Work */}
        <Text style={styles.sectionHeading}>2. Scope of Work</Text>
        <Text style={{ marginBottom: 4 }}>{WCR_FIXED_TEXT.scopeOfWorkIntro}</Text>
        {WCR_FIXED_TEXT.scopeOfWorkBullets.map((bullet, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={{ marginRight: 4 }}>•</Text>
            <Text style={styles.bulletValue}>{bullet}</Text>
          </View>
        ))}

        {/* 3. System Configuration Details */}
        <Text style={styles.sectionHeading}>3. System Configuration Details</Text>
        <Text style={styles.subHeading}>3.1 Solar PV Modules</Text>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Make:</Text>
          <Text style={styles.bulletValue}>{formData.moduleMake}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Rated Capacity:</Text>
          <Text style={styles.bulletValue}>{formData.moduleRatedCap}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Total Quantity:</Text>
          <Text style={styles.bulletValue}>{formData.moduleQty}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Total DC Capacity:</Text>
          <Text style={styles.bulletValue}>{formData.moduleTotalDcCap}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>Modules Serial Number:</Text>
          <Text style={styles.bulletValue}>{formData.modulesSerialNo || '____________________'}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>Inverter Serial Number:</Text>
          <Text style={styles.bulletValue}>{formData.inverterSerialNo || '____________________'}</Text>
        </View>

        <Text style={styles.subHeading}>3.2 Inverter Details</Text>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Make:</Text>
          <Text style={styles.bulletValue}>{formData.inverterMake}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Rated Capacity:</Text>
          <Text style={styles.bulletValue}>{formData.inverterRatedCap}</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletLabel}>• Type:</Text>
          <Text style={styles.bulletValue}>{formData.inverterType}</Text>
        </View>

        {/* Fixed Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTitle}>MINUS CO2 ENERGY PVT LTD.</Text>
          <Text style={styles.footerText}>
            Corporate Office: Hermes Atrium, Office No.309, Plot No.57, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra - 400 614.
          </Text>
          <Text style={styles.footerText}>www.minusco2.in | info@minusco2.in | 022 4976 6944</Text>
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.greenBar} />
          <Image src={resolvedLogoUrl} style={styles.logo} />
        </View>

        {/* 4. String Configuration Details */}
        <Text style={styles.sectionHeading}>4. String Configuration Details</Text>
        <Text style={{ marginBottom: 6 }}>
          {WCR_FIXED_TEXT.stringConfigSentence(
            formData.dcStringsCount,
            formData.stringInverterMake,
            formData.stringInverterSize,
            formData.includeTables !== false
          )}
        </Text>

        {/* String Voltage and Current Table */}
        {formData.includeTables !== false && (
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>String voltages and Current details</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: 45 }]}>String #</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>MPPT NO</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Time</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>No. of Modules</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>String Voltage (V DC)</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1.2, borderRightWidth: 0 }]}>String Current (I DC)</Text>
            </View>
            {formData.stringRows && formData.stringRows.length > 0 ? (
              formData.stringRows.map((row) => (
                <View key={row.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 45, fontFamily: 'Helvetica-Bold' }]}>{row.stringNo}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{row.mpptNo || '—'}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{row.time || '—'}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{row.noOfModules || '—'}</Text>
                  <Text style={[styles.tableCell, { flex: 1.2 }]}>{row.stringVoltage || '—'}</Text>
                  <Text style={[styles.tableCell, { flex: 1.2, borderRightWidth: 0 }]}>{row.stringCurrent || '—'}</Text>
                </View>
              ))
            ) : null}
          </View>
        )}

        {/* IF TABLES ARE INCLUDED: AC Side Voltages & Currents */}
        {formData.includeTables !== false ? (
          <>
            <Text style={styles.sectionHeading}>AC side Voltages and current</Text>
            <View style={styles.twoColGrid}>
              {/* Phase Voltages */}
              <View style={styles.halfTable}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { width: 70 }]}>Phase</Text>
                  <Text style={[styles.tableHeaderCell, { flex: 1, borderRightWidth: 0 }]}>Voltages</Text>
                </View>
                {voltageRows.map(({ key, label }) => (
                  <View key={key} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { width: 70, fontFamily: 'Helvetica-Bold' }]}>{label}</Text>
                    <Text style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}>
                      {formData.phaseVoltages ? formData.phaseVoltages[key] || '' : ''}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Phase Current Part 1 */}
              <View style={styles.halfTable}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { width: 70 }]}>Phase</Text>
                  <Text style={[styles.tableHeaderCell, { flex: 1, borderRightWidth: 0 }]}>Current</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 70, fontFamily: 'Helvetica-Bold' }]}>R phase</Text>
                  <Text style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}>{formData.phaseCurrents?.rPhase || ''}</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: 70, fontFamily: 'Helvetica-Bold' }]}>Y phase</Text>
                  <Text style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}>{formData.phaseCurrents?.yPhase || ''}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* IF TABLES ARE OMITTED: Render Section 5, 6, 7 & Signatures on Page 2 */
          <>
            {/* 5. Electrical Installation Details */}
            <Text style={styles.sectionHeading}>5. Electrical Installation Details</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DC Cables:</Text>
              <Text style={styles.bulletValue}>{formData.dcCables}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• AC Cables:</Text>
              <Text style={styles.bulletValue}>{formData.acCables}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DCDB Installed:</Text>
              <Text style={styles.bulletValue}>{formData.dcdbInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• ACDB Installed:</Text>
              <Text style={styles.bulletValue}>{formData.acdbInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• AC Isolator:</Text>
              <Text style={styles.bulletValue}>{formData.acIsolator}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Earthing System:</Text>
              <Text style={styles.bulletValue}>{formData.earthingSystem}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Lightning Arrester:</Text>
              <Text style={styles.bulletValue}>{formData.lightningArrester}</Text>
            </View>

            {/* 6. Net Metering Status */}
            <Text style={styles.sectionHeading}>6. Net Metering Status</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Net Meter Application:</Text>
              <Text style={styles.bulletValue}>{formData.netMeterApp}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Net Meter Installed:</Text>
              <Text style={styles.bulletValue}>{formData.netMeterInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Date of Synchronization:</Text>
              <Text style={styles.bulletValue}>{formattedSyncDate || '_________________________'}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DISCOM-</Text>
              <Text style={styles.bulletValue}>{formData.discom}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Meter Type-(Ratio)</Text>
              <Text style={styles.bulletValue}>{formData.meterTypeRatio}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• CT-(Ratio)</Text>
              <Text style={styles.bulletValue}>{formData.ctRatio}</Text>
            </View>

            {/* 7. Client Remark */}
            <Text style={styles.sectionHeading}>7. Client Remark</Text>
            {formData.clientRemark ? (
              <View style={styles.clientRemarkBox}>
                <Text>{formData.clientRemark}</Text>
              </View>
            ) : (
              <View style={{ marginBottom: 8 }}>
                <View style={styles.dottedLine} />
                <View style={styles.dottedLine} />
                <View style={styles.dottedLine} />
              </View>
            )}

            {/* Sign-off Area Headers & Signatures */}
            <View style={[styles.signoffRow, { marginTop: 6 }]}>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  Company name- {formData.companyName || 'MinusCO2 Energy Pvt.Ltd.'}
                </Text>
                <Text style={{ marginTop: 4 }}>Name- {formData.companySignatoryName || '…………………………………………'}</Text>
                <Text style={{ marginTop: 4 }}>Designation- {formData.companySignatoryDesignation || '…………………………………………'}</Text>
              </View>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  Client- {formData.clientSignatoryName || formData.clientName}
                </Text>
                <Text style={{ marginTop: 4 }}>Name- {formData.clientSignatoryDesignation || '…………………………………………'}</Text>
                <Text style={{ marginTop: 4 }}>Designation- ………………………………………………………………</Text>
              </View>
            </View>

            <View style={[styles.signoffRow, { marginTop: 10 }]}>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Signature-…………………………………………</Text>
              </View>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Signature-…………………………………………</Text>
              </View>
            </View>
          </>
        )}

        {/* Fixed Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTitle}>MINUS CO2 ENERGY PVT LTD.</Text>
          <Text style={styles.footerText}>
            Corporate Office: Hermes Atrium, Office No.309, Plot No.57, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra - 400 614.
          </Text>
          <Text style={styles.footerText}>www.minusco2.in | info@minusco2.in | 022 4976 6944</Text>
        </View>
      </Page>

      {/* PAGE 3 & 4 ONLY RENDERED WHEN TABLES ARE INCLUDED */}
      {formData.includeTables !== false && (
        <>
          {/* PAGE 3 */}
          <Page size="A4" style={styles.page}>
            <View style={styles.headerRow}>
              <View style={styles.greenBar} />
              <Image src={resolvedLogoUrl} style={styles.logo} />
            </View>

            {/* Phase Current B phase continuation */}
            <View style={[styles.halfTable, { marginBottom: 12 }]}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: 70, fontFamily: 'Helvetica-Bold' }]}>B phase</Text>
                <Text style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}>{formData.phaseCurrents?.bPhase || ''}</Text>
              </View>
            </View>

            {/* 5. Electrical Installation Details */}
            <Text style={styles.sectionHeading}>5. Electrical Installation Details</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DC Cables:</Text>
              <Text style={styles.bulletValue}>{formData.dcCables}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• AC Cables:</Text>
              <Text style={styles.bulletValue}>{formData.acCables}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DCDB Installed:</Text>
              <Text style={styles.bulletValue}>{formData.dcdbInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• ACDB Installed:</Text>
              <Text style={styles.bulletValue}>{formData.acdbInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• AC Isolator:</Text>
              <Text style={styles.bulletValue}>{formData.acIsolator}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Earthing System:</Text>
              <Text style={styles.bulletValue}>{formData.earthingSystem}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Lightning Arrester:</Text>
              <Text style={styles.bulletValue}>{formData.lightningArrester}</Text>
            </View>

            {/* 6. Net Metering Status */}
            <Text style={styles.sectionHeading}>6. Net Metering Status</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Net Meter Application:</Text>
              <Text style={styles.bulletValue}>{formData.netMeterApp}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Net Meter Installed:</Text>
              <Text style={styles.bulletValue}>{formData.netMeterInstalled}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Date of Synchronization:</Text>
              <Text style={styles.bulletValue}>{formattedSyncDate || '_________________________'}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• DISCOM-</Text>
              <Text style={styles.bulletValue}>{formData.discom}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• Meter Type-(Ratio)</Text>
              <Text style={styles.bulletValue}>{formData.meterTypeRatio}</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bulletLabel}>• CT-(Ratio)</Text>
              <Text style={styles.bulletValue}>{formData.ctRatio}</Text>
            </View>

            {/* 7. Client Remark */}
            <Text style={styles.sectionHeading}>7. Client Remark</Text>
            {formData.clientRemark ? (
              <View style={styles.clientRemarkBox}>
                <Text>{formData.clientRemark}</Text>
              </View>
            ) : (
              <View style={{ marginBottom: 12 }}>
                <View style={styles.dottedLine} />
                <View style={styles.dottedLine} />
                <View style={styles.dottedLine} />
                <View style={styles.dottedLine} />
              </View>
            )}

            {/* Sign-off Area Headers */}
            <View style={styles.signoffRow}>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  Company name- {formData.companyName || 'MinusCO2 Energy Pvt.Ltd.'}
                </Text>
                <Text style={{ marginTop: 8 }}>Name- {formData.companySignatoryName || '…………………………………………'}</Text>
                <Text style={{ marginTop: 8 }}>Designation- {formData.companySignatoryDesignation || '…………………………………………'}</Text>
              </View>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                  Client- {formData.clientSignatoryName || formData.clientName}
                </Text>
                <Text style={{ marginTop: 8 }}>Name- {formData.clientSignatoryDesignation || '…………………………………………'}</Text>
                <Text style={{ marginTop: 8 }}>Designation- ………………………………………………………………</Text>
              </View>
            </View>

            {/* Fixed Footer */}
            <View style={styles.footer} fixed>
              <Text style={styles.footerTitle}>MINUS CO2 ENERGY PVT LTD.</Text>
              <Text style={styles.footerText}>
                Corporate Office: Hermes Atrium, Office No.309, Plot No.57, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra - 400 614.
              </Text>
              <Text style={styles.footerText}>www.minusco2.in | info@minusco2.in | 022 4976 6944</Text>
            </View>
          </Page>

          {/* PAGE 4 */}
          <Page size="A4" style={styles.page}>
            <View style={styles.headerRow}>
              <View style={styles.greenBar} />
              <Image src={resolvedLogoUrl} style={styles.logo} />
            </View>

            {/* Signatures Row */}
            <View style={[styles.signoffRow, { marginTop: 24 }]}>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Signature-…………………………………………</Text>
              </View>
              <View style={styles.signoffCol}>
                <Text style={{ fontFamily: 'Helvetica-Bold' }}>Signature-…………………………………………</Text>
              </View>
            </View>

            {/* Fixed Footer */}
            <View style={styles.footer} fixed>
              <Text style={styles.footerTitle}>MINUS CO2 ENERGY PVT LTD.</Text>
              <Text style={styles.footerText}>
                Corporate Office: Hermes Atrium, Office No.309, Plot No.57, Sector 11, CBD Belapur, Navi Mumbai, Maharashtra - 400 614.
              </Text>
              <Text style={styles.footerText}>www.minusco2.in | info@minusco2.in | 022 4976 6944</Text>
            </View>
          </Page>
        </>
      )}

    </Document>
  );
};
