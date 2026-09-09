import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { CODFormData } from '../../types/document';
import { COD_TEMPLATE_FIXED_TEXT } from '../../config/codTemplate';
import { FIXED_CORPORATE_FOOTER } from '../../config/companyProfiles';
import { formatDateDMY, formatOrdinalDate } from '../../utils/formatters';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 70,
    paddingLeft: 45,
    paddingRight: 45,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    color: '#111827',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  dateText: {
    textAlign: 'right',
    fontSize: 9.5,
    marginBottom: 16,
    color: '#1f2937',
  },
  recipientBlock: {
    marginBottom: 16,
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  boldText: {
    fontFamily: 'Helvetica-Bold',
  },
  subject: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
  },
  salutation: {
    fontSize: 9.5,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 9.5,
    marginBottom: 12,
    textAlign: 'justify',
    lineHeight: 1.5,
  },
  readingsIntro: {
    fontSize: 9.5,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  meterContainer: {
    marginBottom: 16,
    paddingLeft: 10,
  },
  meterItemSingle: {
    marginBottom: 6,
    fontSize: 9.5,
  },
  meterItemMulti: {
    marginBottom: 8,
    fontSize: 9.5,
    backgroundColor: '#f9fafb',
    padding: 6,
    borderRadius: 4,
  },
  jointSignBlock: {
    marginTop: 15,
    fontSize: 9.5,
  },
  signLine: {
    width: 180,
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af',
    marginTop: 15,
    marginBottom: 5,
  },
  closing: {
    fontSize: 9.5,
    marginBottom: 24,
  },
  signatoryBlock: {
    marginTop: 10,
    fontSize: 9.5,
  },
  signSpace: {
    height: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 45,
    right: 45,
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#000000',
    marginBottom: 2,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 7.5,
    color: '#374151',
    lineHeight: 1.3,
    textAlign: 'center',
  },
});

interface CODPdfDocumentProps {
  formData: CODFormData;
  logoUrl?: string;
}

export const CODPdfDocument: React.FC<CODPdfDocumentProps> = ({ formData, logoUrl }) => {
  const formattedLetterDate = formatDateDMY(formData.letterDate || new Date());
  const formattedJointDate = formatDateDMY(formData.jointReadingDate);
  const formattedBillingDate = formatOrdinalDate(formData.firstBillingReadingDate);

  const resolvedLogoUrl = logoUrl || (typeof window !== 'undefined' ? `${window.location.origin}/minusco2_logo.jpg` : '/minusco2_logo.jpg');

  return (
    <Document title={`COD_Intimation_${formData.clientName || 'Letter'}`}>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.greenBar} />
          <Image src={resolvedLogoUrl} style={styles.logo} />
        </View>

        {/* Date */}
        <Text style={styles.dateText}>Date:{formattedLetterDate}</Text>

        {/* Recipient */}
        <View style={styles.recipientBlock}>
          <Text style={styles.boldText}>To</Text>
          <Text style={styles.boldText}>{formData.clientName || ''}</Text>
          {formData.clientAddress ? (
            formData.clientAddress.split('\n').map((line, i) => (
              <Text key={i}>{line}</Text>
            ))
          ) : null}
        </View>

        {/* Subject & Salutation */}
        <Text style={styles.subject}>{COD_TEMPLATE_FIXED_TEXT.subject}</Text>
        <Text style={styles.salutation}>{COD_TEMPLATE_FIXED_TEXT.salutation}</Text>

        {/* Paragraph 1 */}
        <Text style={styles.paragraph}>
          I am pleased to inform you that the installation of{' '}
          <Text style={styles.boldText}>{formData.systemCapacity || '71.98'} KWp</Text> Solar System For{' '}
          <Text style={styles.boldText}>{formData.building || 'D-Wing'}</Text> (
          <Text style={styles.boldText}>{formData.phase || 'Phase 2'}</Text>) has been Completed along with the Generation Meter and Net Meter has been successfully completed. Today, we jointly took the first reading with Ms{' '}
          <Text style={styles.boldText}>{formData.jointReadingPersonName || ''}</Text> the official from your society. This marks an important milestone in our journey towards sustainable energy.
        </Text>

        {/* Paragraph 2 */}
        <Text style={styles.paragraph}>
          The solar generation meter calculates the amount of energy generated by the solar power plant. The net meter measures both import and export units to determine the amount of energy consumed from{' '}
          <Text style={styles.boldText}>{formData.energyProvider || 'Adani'}</Text>. Finally, the check meter is used to verify the reading of the generation meter.
        </Text>

        {/* Readings Intro */}
        <Text style={styles.readingsIntro}>
          Please find the joint readings taken on Date:{' '}
          <Text style={styles.boldText}>{formattedJointDate}</Text>
        </Text>

        {/* Meter List */}
        <View style={styles.meterContainer}>
          {formData.generationMeters && formData.generationMeters.length > 0 ? (
            formData.generationMeters.map((meter, index) => {
              const isSingle = formData.generationMeters.length === 1;
              if (isSingle) {
                return (
                  <View key={meter.id} style={styles.meterItemSingle}>
                    <Text>
                      1. Generation Meter: <Text style={styles.boldText}>{meter.generationReading || '0.0 KWH'}</Text>
                    </Text>
                    <Text>
                      2. Net Meter: A) Import: <Text style={styles.boldText}>{meter.netImport ? `${meter.netImport} KWH` : '________'}</Text> B) Export: <Text style={styles.boldText}>{meter.netExport ? `${meter.netExport} KWH` : '________'}</Text>
                    </Text>
                  </View>
                );
              }
              return (
                <View key={meter.id} style={styles.meterItemMulti}>
                  <Text style={styles.boldText}>
                    {index + 1}. Generation Meter: {meter.generationReading || '0.0 KWH'}
                  </Text>
                  <Text>
                    Net Meter: A) Import: <Text style={styles.boldText}>{meter.netImport ? `${meter.netImport} KWH` : '________'}</Text>  B) Export: <Text style={styles.boldText}>{meter.netExport ? `${meter.netExport} KWH` : '________'}</Text>
                  </Text>
                </View>
              );
            })
          ) : null}
        </View>

        {/* Joint Reading Signature Block */}
        <View style={styles.jointSignBlock}>
          <Text style={styles.boldText}>{COD_TEMPLATE_FIXED_TEXT.jointSignHeading}</Text>
          <Text style={{ marginTop: 4 }}>
            Name: <Text style={styles.boldText}>{formData.jointReadingPersonName || ''}</Text>
          </Text>
          <Text style={{ marginTop: 4 }}>Sign:</Text>
          <View style={styles.signLine} />
        </View>

        {/* Fixed Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTitle}>{FIXED_CORPORATE_FOOTER.companyTitle}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.addressLine1}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.addressLine2}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.contactLine}</Text>
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.greenBar} />
          <Image src={resolvedLogoUrl} style={styles.logo} />
        </View>

        {/* Page 2 Paragraph 1 */}
        <Text style={styles.paragraph}>{COD_TEMPLATE_FIXED_TEXT.page2Paragraph1}</Text>

        {/* Page 2 Paragraph 2 */}
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Please note:</Text> Our first readings for billing is scheduled for{' '}
          <Text style={styles.boldText}>{formattedBillingDate || ''}</Text>. The generation invoice will be sent to you between the 1st and 5th of the following month, and the payment due date would be 15 days from the invoice date.
        </Text>

        {/* Closing */}
        <Text style={styles.closing}>{COD_TEMPLATE_FIXED_TEXT.closing}</Text>

        {/* Signatory Block */}
        <View style={styles.signatoryBlock}>
          <Text style={styles.boldText}>
            For {formData.issuingCompany ? formData.issuingCompany.toUpperCase() : 'MINUS CO2 SOLAR ASSIST LLP.'}
          </Text>
          <View style={styles.signSpace} />
          <Text style={styles.boldText}>{formData.signatoryName || 'AKSHAY PATIL.'}</Text>
          <Text>{formData.signatoryDesignation || 'Manager- Accounts & Administration.'}</Text>
        </View>

        {/* Fixed Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerTitle}>{FIXED_CORPORATE_FOOTER.companyTitle}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.addressLine1}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.addressLine2}</Text>
          <Text style={styles.footerText}>{FIXED_CORPORATE_FOOTER.contactLine}</Text>
        </View>
      </Page>
    </Document>
  );
};
