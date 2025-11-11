/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export function validateEmail(email) {
  if (!email) return false;

  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates username according to registration rules
 * @param {string} username - Username to validate
 * @returns {string[]} - Array of error messages (empty if valid)
 */
export function validateUsername(username) {
  const errors = [];

  // Check if username exists
  if (!username || username.trim() === "") {
    errors.push("Username is required");
    return errors;
  }

  // Check length (3-20 characters)
  if (username.length < 3 || username.length > 20) {
    errors.push("Username must be 3-20 characters");
  }

  // Check if contains only letters, numbers, and underscore
  const validCharsRegex = /^[a-zA-Z0-9_]+$/;
  if (!validCharsRegex.test(username)) {
    errors.push("Username can only contain letters, numbers, and underscore");
  }

  // Check if starts with a number
  if (/^[0-9]/.test(username)) {
    errors.push("Username cannot start with a number");
  }

  return errors;
}

/**
 * Validates email field
 * @param {string} email - Email to validate
 * @returns {string[]} - Array of error messages (empty if valid)
 */
export function validateEmailField(email) {
  const errors = [];

  if (!email || email.trim() === "") {
    errors.push("Email is required");
    return errors;
  }

  if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }

  return errors;
}

/**
 * Validates password according to security rules
 * @param {string} password - Password to validate
 * @returns {string[]} - Array of error messages (empty if valid)
 */
export function validatePassword(password) {
  const errors = [];

  // Check if password exists
  if (!password || password === "") {
    errors.push("Password is required");
    return errors;
  }

  // Check minimum length (8 characters)
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain uppercase letter");
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain number");
  }

  // Check for at least one special character (!@#$%^&*)
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain special character");
  }

  return errors;
}

/**
 * Validates age field
 * @param {number} age - Age to validate
 * @returns {string[]} - Array of error messages (empty if valid)
 */
export function validateAge(age) {
  const errors = [];

  // Check if age exists (including 0 as valid)
  if (age === null || age === undefined || age === "") {
    errors.push("Age is required");
    return errors;
  }

  // Check if age is a number
  if (typeof age !== "number" || isNaN(age)) {
    errors.push("Age must be a number");
    return errors;
  }

  // Check if user is 18 or older
  if (age < 18) {
    errors.push("Must be 18 or older");
  }

  return errors;
}

/**
 * Validates user registration data
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @param {number} userData.age - User age
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export function validateRegistration(userData) {
  const errors = [];

  // Validate username
  errors.push(...validateUsername(userData.username));

  // Validate email
  errors.push(...validateEmailField(userData.email));

  // Validate password
  errors.push(...validatePassword(userData.password));

  // Validate age
  errors.push(...validateAge(userData.age));

  return {
    isValid: errors.length === 0,
    errors,
  };
}
