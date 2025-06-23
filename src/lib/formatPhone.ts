export function formatSwedishPhone(phone: string): string {
  // Remove +46 and any spaces
  let cleaned = phone.replace('+46', '').replace(/\s/g, '').trim();
  
  // Add leading 0 if missing
  if (!cleaned.startsWith('0')) {
    cleaned = '0' + cleaned;
  }
  
  // Format based on area code
  if (cleaned.startsWith('018')) {
    // Uppsala format: 018-XX XX XX
    return cleaned.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1-$2 $3 $4');
  } else if (cleaned.startsWith('08')) {
    // Stockholm format: 08-XXX XX XX
    return cleaned.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1-$2 $3 $4');
  } else if (cleaned.startsWith('0')) {
    // Mobile or other format: 0XX-XXX XX XX
    return cleaned.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2 $3 $4');
  }
  
  // Fallback
  return cleaned;
}