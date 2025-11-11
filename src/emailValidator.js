export function isValidEmail(email) {
  // Validate input type
  if (!email || typeof email !== 'string') return false;
  
  // Check for invalid characters
  if (email.includes(' ')) return false;
  
  // Validate structure
  const [username, domain] = email.split('@');
  
  // Ensure proper format
  if (!username || !domain || email.split('@').length !== 2) return false;
  if (!domain.includes('.')) return false;
  
  return true;
}