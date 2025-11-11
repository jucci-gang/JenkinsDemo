import { describe, it, expect } from "vitest";
import { validateRegistration } from "../userValidator.js";

describe("User Registration Validator", () => {
  describe("Username Validation", () => {
    it("should pass for valid username", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it("should fail when username is missing", () => {
      const result = validateRegistration({
        username: "",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Username is required");
    });

    it("should fail when username is too short", () => {
      const result = validateRegistration({
        username: "ab",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Username must be 3-20 characters");
    });

    it("should fail when username is too long", () => {
      const result = validateRegistration({
        username: "a".repeat(21),
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Username must be 3-20 characters");
    });

    it("should fail when username contains invalid characters", () => {
      const result = validateRegistration({
        username: "john-doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Username can only contain letters, numbers, and underscore",
      );
    });

    it("should fail when username starts with a number", () => {
      const result = validateRegistration({
        username: "123user",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Username cannot start with a number");
    });
  });

  describe("Email Validation", () => {
    it("should fail when email is missing", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Email is required");
    });

    it("should fail when email format is invalid", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "invalid-email",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Invalid email format");
    });

    it("should pass for valid email", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "user@example.com",
        password: "SecurePass123!",
        age: 25,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe("Password Validation", () => {
    it("should fail when password is missing", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password is required");
    });

    it("should fail when password is too short", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "Short1!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must be at least 8 characters");
    });

    it("should fail when password has no uppercase letter", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "password123!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must contain uppercase letter");
    });

    it("should fail when password has no number", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "Password!",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Password must contain number");
    });

    it("should fail when password has no special character", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "Password123",
        age: 25,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Password must contain special character",
      );
    });

    it("should pass for valid password", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "ValidPass123!",
        age: 25,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe("Age Validation", () => {
    it("should fail when age is missing", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: null,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Age is required");
    });

    it("should fail when age is not a number", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: "twenty",
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Age must be a number");
    });

    it("should fail when user is under 18", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 15,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Must be 18 or older");
    });

    it("should pass when user is exactly 18", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 18,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it("should pass when user is over 18", () => {
      const result = validateRegistration({
        username: "john_doe",
        email: "john@example.com",
        password: "SecurePass123!",
        age: 30,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe("Multiple Errors", () => {
    it("should return all validation errors when multiple fields are invalid", () => {
      const result = validateRegistration({
        username: "123user",
        email: "invalid-email",
        password: "weak",
        age: 15,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Username cannot start with a number");
      expect(result.errors).toContain("Invalid email format");
      expect(result.errors).toContain("Password must be at least 8 characters");
      expect(result.errors).toContain("Password must contain uppercase letter");
      expect(result.errors).toContain("Password must contain number");
      expect(result.errors).toContain(
        "Password must contain special character",
      );
      expect(result.errors).toContain("Must be 18 or older");
      expect(result.errors.length).toBe(7);
    });

    it("should return empty errors array for completely valid data", () => {
      const result = validateRegistration({
        username: "valid_user123",
        email: "user@example.com",
        password: "ValidPass123!",
        age: 25,
      });
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });
});
