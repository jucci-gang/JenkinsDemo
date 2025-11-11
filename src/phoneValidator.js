/**
 * Validates Philippine phone numbers
 * 
 * Valid formats:
 * - 09171234567 (11 digits starting with 09)
 * - +639171234567 (with country code)
 * - 639171234567 (country code without +)
 * 
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validatePhoneNumber(phoneNumber) {
  // Handle null, undefined, non-string, or empty values
  if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Define validation patterns for Philippine phone numbers
  const validFormats = [
    /^09\d{9}$/,      // Format: 09171234567 (11 digits starting with 09)
    /^\+639\d{9}$/,   // Format: +639171234567 (with +63 country code)
    /^639\d{9}$/      // Format: 639171234567 (without + but with 63 country code)
  ];

  // Check if the phone number matches any valid format
  return validFormats.some(format => format.test(trimmed));
}
