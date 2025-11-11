import { describe, test, expect } from "vitest";
import { validatePhoneNumber } from "../phoneValidator.js";

describe("Philippine Phone Number Validator", () => {
  // Test 1: Valid 11-digit number starting with 09
  test("should accept valid 11-digit number starting with 09", () => {
    expect(validatePhoneNumber("09171234567")).toBe(true);
    expect(validatePhoneNumber("09281234567")).toBe(true);
    expect(validatePhoneNumber("09991234567")).toBe(true);
  });

  // Test 2: Valid number with +63 country code
  test("should accept valid number with +63 country code", () => {
    expect(validatePhoneNumber("+639171234567")).toBe(true);
    expect(validatePhoneNumber("+639281234567")).toBe(true);
  });

  // Test 3: Valid number with 63 country code (without +)
  test("should accept valid number with 63 country code without +", () => {
    expect(validatePhoneNumber("639171234567")).toBe(true);
    expect(validatePhoneNumber("639281234567")).toBe(true);
  });

  // Test 4: Invalid - less than 11 digits
  test("should reject numbers with less than 11 digits", () => {
    expect(validatePhoneNumber("091712345")).toBe(false);
    expect(validatePhoneNumber("0917123456")).toBe(false);
    expect(validatePhoneNumber("09171")).toBe(false);
  });

  // Test 5: Invalid - doesn't start with 09 (or 639/+639)
  test("should reject numbers that do not start with 09, 639, or +639", () => {
    expect(validatePhoneNumber("08171234567")).toBe(false);
    expect(validatePhoneNumber("19171234567")).toBe(false);
    expect(validatePhoneNumber("9171234567")).toBe(false);
    expect(validatePhoneNumber("+649171234567")).toBe(false);
  });

  // Test 6: Invalid - contains letters or special characters
  test("should reject numbers containing letters or special characters", () => {
    expect(validatePhoneNumber("0917-123-4567")).toBe(false);
    expect(validatePhoneNumber("0917 123 4567")).toBe(false);
    expect(validatePhoneNumber("0917ABC4567")).toBe(false);
    expect(validatePhoneNumber("09171234567!")).toBe(false);
    expect(validatePhoneNumber("(0917)1234567")).toBe(false);
  });

  // Test 7: Invalid - empty, null, or undefined
  test("should reject empty, null, or undefined values", () => {
    expect(validatePhoneNumber("")).toBe(false);
    expect(validatePhoneNumber(null)).toBe(false);
    expect(validatePhoneNumber(undefined)).toBe(false);
  });

  // Test 8: Invalid - more than required digits
  test("should reject numbers with too many digits", () => {
    expect(validatePhoneNumber("091712345678")).toBe(false);
    expect(validatePhoneNumber("+6391712345678")).toBe(false);
  });

  // Test 9: Edge case - + in wrong position
  test("should reject + symbol in wrong position", () => {
    expect(validatePhoneNumber("639+171234567")).toBe(false);
    expect(validatePhoneNumber("0917123+4567")).toBe(false);
  });
});
