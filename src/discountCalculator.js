/**
 * Discount code mappings
 */
const DISCOUNT_CODES = {
  SAVE10: 10,
  SAVE20: 20,
  SAVE50: 50,
  FIRSTBUY: 15,
};

/**
 * Minimum purchase amount required for discounts to apply
 */
const MINIMUM_PURCHASE_AMOUNT = 50;

/**
 * Calculate final price after applying discount code
 * @param {number} originalPrice - The original price of the item
 * @param {string} discountCode - The discount code to apply
 * @returns {{finalPrice: number, discountApplied: number, discountPercentage: number}}
 * @throws {Error} If price is not a valid positive number
 */
export function calculateFinalPrice(originalPrice, discountCode = "") {
  // Validate that price is a number
  if (typeof originalPrice !== "number" || isNaN(originalPrice)) {
    throw new Error("Price must be a number");
  }

  // Validate that price is positive
  if (originalPrice < 0) {
    throw new Error("Price must be positive");
  }

  // Normalize discount code to uppercase for case-insensitive comparison
  const normalizedCode = discountCode ? discountCode.trim().toUpperCase() : "";

  // Get discount percentage (default to 0 if code is invalid)
  const discountPercentage = DISCOUNT_CODES[normalizedCode] || 0;

  // Check if price meets minimum purchase requirement for discount
  const meetsMinimum = originalPrice > MINIMUM_PURCHASE_AMOUNT;
  const applicableDiscount = meetsMinimum ? discountPercentage : 0;

  // Calculate discount amount
  const discountAmount = (originalPrice * applicableDiscount) / 100;

  // Calculate final price
  let finalPrice = originalPrice - discountAmount;

  // Ensure price doesn't go below 0
  finalPrice = Math.max(0, finalPrice);

  // Round to 2 decimal places
  finalPrice = Math.round(finalPrice * 100) / 100;

  return {
    finalPrice,
    discountApplied: applicableDiscount,
    discountPercentage: applicableDiscount,
  };
}
