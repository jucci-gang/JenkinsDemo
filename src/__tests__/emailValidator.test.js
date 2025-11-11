import { describe, it, expect } from 'vitest';
import { isValidEmail } from '../emailValidator';

describe('Email Validator', () => {
  it('should return true for valid email', () => {
    const email = 'user@example.com';
    const result = isValidEmail(email);
    expect(result).toBe(true);
  });

  it('should return false for email without @', () => {
    const result = isValidEmail('userexample.com');
    expect(result).toBe(false);
  });

  it('should return false for email without domain', () => {
    const result = isValidEmail('user@');
    expect(result).toBe(false);
  });

  it('should return false for email without username', () => {
    const result = isValidEmail('@example.com');
    expect(result).toBe(false);
  });

  it('should return false for empty string', () => {
    const result = isValidEmail('');
    expect(result).toBe(false);
  });

  it('should return false for null', () => {
    const result = isValidEmail(null);
    expect(result).toBe(false);
  });

  it('should return false for email with spaces', () => {
    const result = isValidEmail('user @example.com');
    expect(result).toBe(false);
  });
});