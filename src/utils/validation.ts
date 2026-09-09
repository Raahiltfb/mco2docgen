import { CODFormData, FormValidationErrors } from '../types/document';

export function validateCODForm(data: CODFormData): FormValidationErrors {
  const errors: FormValidationErrors = {};

  if (!data.clientName.trim()) {
    errors.clientName = 'Client / Society Name is required';
  }

  if (!data.clientAddress.trim()) {
    errors.clientAddress = 'Client Address is required';
  }

  if (!data.systemCapacity.trim()) {
    errors.systemCapacity = 'System Capacity is required';
  } else if (isNaN(Number(data.systemCapacity.trim())) || Number(data.systemCapacity.trim()) <= 0) {
    errors.systemCapacity = 'System Capacity must be a valid positive number';
  }

  if (!data.building.trim()) {
    errors.building = 'Building is required';
  }

  if (!data.phase.trim()) {
    errors.phase = 'Phase is required';
  }

  if (!data.jointReadingPersonName.trim()) {
    errors.jointReadingPersonName = 'Joint Reading Person Name is required';
  }

  if (!data.energyProvider.trim()) {
    errors.energyProvider = 'Energy Provider is required';
  }

  if (!data.jointReadingDate) {
    errors.jointReadingDate = 'Joint Reading Date is required';
  }

  if (!data.firstBillingReadingDate) {
    errors.firstBillingReadingDate = 'First Billing Reading Date is required';
  }

  if (!data.issuingCompany) {
    errors.issuingCompany = 'Issuing Company is required';
  }

  if (!data.signatoryName.trim()) {
    errors.signatoryName = 'Signatory Name is required';
  }

  if (!data.signatoryDesignation.trim()) {
    errors.signatoryDesignation = 'Signatory Designation is required';
  }

  if (!data.generationMeters || data.generationMeters.length === 0) {
    errors.generationMeters = 'At least one Generation Meter is required';
  } else {
    data.generationMeters.forEach((meter, index) => {
      if (!meter.generationReading.trim()) {
        errors[`meter_${index}_generation`] = `Meter ${index + 1}: Generation reading is required`;
      }
      if (!meter.netImport.trim()) {
        errors[`meter_${index}_import`] = `Meter ${index + 1}: Net Import reading is required`;
      }
      if (!meter.netExport.trim()) {
        errors[`meter_${index}_export`] = `Meter ${index + 1}: Net Export reading is required`;
      }
    });
  }

  return errors;
}
