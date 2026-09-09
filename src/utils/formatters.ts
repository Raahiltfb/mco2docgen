/**
 * Formats a date string (YYYY-MM-DD or Date) into DD/MM/YYYY
 */
export function formatDateDMY(dateInput?: string | Date): string {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Returns ordinal suffix for a day number (1 -> 1st, 2 -> 2nd, 3 -> 3rd, 4 -> 4th, 28 -> 28th)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:  return 'st';
    case 2:  return 'nd';
    case 3:  return 'rd';
    default: return 'th';
  }
}

/**
 * Formats a date string (YYYY-MM-DD) into natural format like "28th February 2026"
 */
export function formatOrdinalDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const day = d.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

/**
 * Sanitizes a string for safe use in file names
 */
export function sanitizeForFilename(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Generates standardized COD PDF filename:
 * COD_Intimation_[ClientName]_[Capacity]kWp_[Date].pdf
 */
export function generatePdfFilename(clientName: string, capacity: string, dateStr?: string): string {
  const cleanClient = sanitizeForFilename(clientName) || 'Client';
  const cleanCap = capacity.trim() || '0';
  const d = dateStr ? new Date(dateStr) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const dateFormatted = `${day}-${month}-${year}`;

  return `COD_Intimation_${cleanClient}_${cleanCap}kWp_${dateFormatted}.pdf`;
}

/**
 * Generates standardized WCR PDF filename:
 * WCR_[ClientName]_[Capacity]kWp_[Date].pdf
 */
export function generateWcrPdfFilename(clientName: string, capacity: string, dateStr?: string): string {
  const cleanClient = sanitizeForFilename(clientName) || 'Client';
  const cleanCap = capacity.replace(/[^0-9.]/g, '').trim() || '0';
  const d = dateStr ? new Date(dateStr) : new Date();
  const validDate = isNaN(d.getTime()) ? new Date() : d;
  const day = String(validDate.getDate()).padStart(2, '0');
  const month = String(validDate.getMonth() + 1).padStart(2, '0');
  const year = validDate.getFullYear();
  const dateFormatted = `${day}-${month}-${year}`;

  return `WCR_${cleanClient}_${cleanCap}kWp_${dateFormatted}.pdf`;
}
