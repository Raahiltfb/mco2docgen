export interface GenerationMeter {
  id: string;
  generationReading: string;
  netImport: string;
  netExport: string;
}

export type IssuingCompany = 'Minus CO2 Pvt. Ltd.' | 'Minus CO2 Solar Assist LLP.';

export interface CODFormData {
  // Section 1: Client / Recipient
  clientName: string;
  clientAddress: string;

  // Section 2: Project Details
  systemCapacity: string; // e.g. "71.98"
  building: string; // e.g. "D-Wing"
  phase: string; // e.g. "Phase 2"

  // Section 3: Joint Reading Details
  jointReadingPersonName: string; // Populates both letter text and signature section
  energyProvider: string; // e.g. "Adani"
  jointReadingDate: string; // Manual selection (YYYY-MM-DD)

  // Section 4: Dynamic Meters
  generationMeters: GenerationMeter[];

  // Section 5: Billing Details
  firstBillingReadingDate: string; // Manual selection (YYYY-MM-DD)

  // Section 6: Letter & Signatory Details
  letterDate: string; // Auto-generated today's date (formatted as DD/MM/YYYY)
  issuingCompany: IssuingCompany; // Dropdown: 'Minus CO2 Pvt. Ltd.' | 'Minus CO2 Solar Assist LLP.'
  signatoryName: string; // e.g. "AKSHAY PATIL."
  signatoryDesignation: string; // e.g. "Manager - Accounts & Administration."
}

export interface FormValidationErrors {
  [key: string]: string;
}
