import { WCRFormData, WCRValidationErrors } from '../types/wcr';

export function validateWCRForm(data: WCRFormData): WCRValidationErrors {
  const errors: WCRValidationErrors = {};

  if (!data.projectName.trim()) {
    errors.projectName = 'Project Name is required';
  }

  if (!data.clientName.trim()) {
    errors.clientName = 'Client Name is required';
  }

  if (!data.siteLocation.trim()) {
    errors.siteLocation = 'Site Location is required';
  }

  if (!data.installedCapacity.trim()) {
    errors.installedCapacity = 'Installed System Capacity is required';
  }

  if (!data.inverterCapacity.trim()) {
    errors.inverterCapacity = 'Inverter Capacity is required';
  }

  if (!data.systemType.trim()) {
    errors.systemType = 'Type of System is required';
  }

  if (!data.completionDate) {
    errors.completionDate = 'Date of Completion is required';
  }

  const dcCount = parseInt(data.dcStringsCount.trim(), 10);
  if (!data.dcStringsCount.trim() || isNaN(dcCount) || dcCount <= 0) {
    errors.dcStringsCount = 'Number of DC Strings must be a positive integer';
  }

  return errors;
}
