import { describe, it, expect } from "vitest";
import { calculateFinalPrice } from "../discountCalculator";

describe("Discount Calculator", () => {
  describe("Valid discount codes", () => {
    it("should apply 10% discount for SAVE10", () => {
      // ARRANGE
      const price = 100;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(90);
      expect(result.discountApplied).toBe(10);
      expect(result.discountPercentage).toBe(10);
    });

    it("should apply 20% discount for SAVE20", () => {
      // ARRANGE
      const price = 100;
      const code = "SAVE20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(80);
      expect(result.discountApplied).toBe(20);
      expect(result.discountPercentage).toBe(20);
    });

    it("should apply 50% discount for SAVE50", () => {
      // ARRANGE
      const price = 100;
      const code = "SAVE50";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(50);
      expect(result.discountApplied).toBe(50);
      expect(result.discountPercentage).toBe(50);
    });

    it("should apply 15% discount for FIRSTBUY", () => {
      // ARRANGE
      const price = 100;
      const code = "FIRSTBUY";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(85);
      expect(result.discountApplied).toBe(15);
      expect(result.discountPercentage).toBe(15);
    });

    it("should apply no discount for invalid code", () => {
      // ARRANGE
      const price = 100;
      const code = "INVALID";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(100);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should apply no discount for empty code", () => {
      // ARRANGE
      const price = 100;
      const code = "";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(100);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should apply no discount when code is undefined", () => {
      // ARRANGE
      const price = 100;

      // ACT
      const result = calculateFinalPrice(price);

      // ASSERT
      expect(result.finalPrice).toBe(100);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });
  });

  describe("Edge cases", () => {
    it("should throw error for negative price", () => {
      expect(() => calculateFinalPrice(-10, "SAVE10")).toThrow(
        "Price must be positive",
      );
    });

    it("should throw error for non-numeric price (string)", () => {
      expect(() => calculateFinalPrice("100", "SAVE10")).toThrow(
        "Price must be a number",
      );
    });

    it("should throw error for non-numeric price (null)", () => {
      expect(() => calculateFinalPrice(null, "SAVE10")).toThrow(
        "Price must be a number",
      );
    });

    it("should throw error for non-numeric price (object)", () => {
      expect(() => calculateFinalPrice({}, "SAVE10")).toThrow(
        "Price must be a number",
      );
    });

    it("should throw error for non-numeric price (NaN)", () => {
      expect(() => calculateFinalPrice(NaN, "SAVE10")).toThrow(
        "Price must be a number",
      );
    });

    it("should handle decimal prices and round to 2 decimal places", () => {
      // ARRANGE
      const price = 99.99;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(89.99);
      expect(result.discountApplied).toBe(10);
      expect(result.discountPercentage).toBe(10);
    });

    it("should round final price to 2 decimal places", () => {
      // ARRANGE
      const price = 133.33;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(120);
      expect(result.discountPercentage).toBe(10);
    });

    it("should handle prices that result in repeating decimals", () => {
      // ARRANGE
      const price = 99.99;
      const code = "FIRSTBUY";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(84.99);
      expect(result.discountPercentage).toBe(15);
    });

    it("should handle zero price", () => {
      // ARRANGE
      const price = 0;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(0);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should not allow final price to go below 0", () => {
      // ARRANGE - This is a theoretical edge case
      const price = 10;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBeGreaterThanOrEqual(0);
    });

    it("should handle very large prices", () => {
      // ARRANGE
      const price = 999999.99;
      const code = "SAVE20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(799999.99);
      expect(result.discountApplied).toBe(20);
    });

    it("should handle very small decimal prices", () => {
      // ARRANGE
      const price = 0.01;
      const code = "SAVE50";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(0.01);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });
  });

  describe("Case insensitivity", () => {
    it("should handle lowercase discount code", () => {
      // ARRANGE
      const price = 100;
      const code = "save10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(90);
      expect(result.discountApplied).toBe(10);
      expect(result.discountPercentage).toBe(10);
    });

    it("should handle mixed case discount code", () => {
      // ARRANGE
      const price = 100;
      const code = "SaVe20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(80);
      expect(result.discountApplied).toBe(20);
      expect(result.discountPercentage).toBe(20);
    });

    it("should handle uppercase FIRSTBUY code", () => {
      // ARRANGE
      const price = 200;
      const code = "FIRSTBUY";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(170);
      expect(result.discountApplied).toBe(15);
      expect(result.discountPercentage).toBe(15);
    });

    it("should handle lowercase firstbuy code", () => {
      // ARRANGE
      const price = 200;
      const code = "firstbuy";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(170);
      expect(result.discountApplied).toBe(15);
      expect(result.discountPercentage).toBe(15);
    });

    it("should handle mixed case save50 code", () => {
      // ARRANGE
      const price = 80;
      const code = "SaVe50";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(40);
      expect(result.discountApplied).toBe(50);
      expect(result.discountPercentage).toBe(50);
    });
  });

  describe("Integration scenarios", () => {
    it("should correctly calculate discount for typical purchase", () => {
      // ARRANGE
      const price = 249.99;
      const code = "SAVE20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(199.99);
      expect(result.discountApplied).toBe(20);
    });

    it("should handle first-time buyer discount on small purchase", () => {
      // ARRANGE
      const price = 29.99;
      const code = "FIRSTBUY";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(29.99);
      expect(result.discountApplied).toBe(0);
    });

    it("should handle maximum discount on large purchase", () => {
      // ARRANGE
      const price = 1000;
      const code = "SAVE50";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(500);
      expect(result.discountApplied).toBe(50);
    });
  });

  describe("Minimum purchase requirement", () => {
    it("should not apply discount if price is exactly $50", () => {
      // ARRANGE
      const price = 50;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(50);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should apply discount if price is $50.01", () => {
      // ARRANGE
      const price = 50.01;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(45.01);
      expect(result.discountApplied).toBe(10);
      expect(result.discountPercentage).toBe(10);
    });

    it("should not apply SAVE20 discount for price below $50", () => {
      // ARRANGE
      const price = 49.99;
      const code = "SAVE20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(49.99);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should not apply SAVE50 discount for price of $30", () => {
      // ARRANGE
      const price = 30;
      const code = "SAVE50";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(30);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should not apply FIRSTBUY discount for price of $25", () => {
      // ARRANGE
      const price = 25;
      const code = "FIRSTBUY";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(25);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should apply SAVE10 discount for price of $51", () => {
      // ARRANGE
      const price = 51;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(45.9);
      expect(result.discountApplied).toBe(10);
      expect(result.discountPercentage).toBe(10);
    });

    it("should apply SAVE20 discount for price of $100", () => {
      // ARRANGE
      const price = 100;
      const code = "SAVE20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(80);
      expect(result.discountApplied).toBe(20);
      expect(result.discountPercentage).toBe(20);
    });

    it("should not apply discount for small purchase even with valid code", () => {
      // ARRANGE
      const price = 10;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(10);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });

    it("should apply discount with case insensitive code when minimum is met", () => {
      // ARRANGE
      const price = 75;
      const code = "save20";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(60);
      expect(result.discountApplied).toBe(20);
      expect(result.discountPercentage).toBe(20);
    });

    it("should not apply discount for zero price even with code", () => {
      // ARRANGE
      const price = 0;
      const code = "SAVE10";

      // ACT
      const result = calculateFinalPrice(price, code);

      // ASSERT
      expect(result.finalPrice).toBe(0);
      expect(result.discountApplied).toBe(0);
      expect(result.discountPercentage).toBe(0);
    });
  });
});
