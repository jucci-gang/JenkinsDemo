export async function createOrder(orderData, paymentService, emailService, inventoryService) {
  // Validate order data
  if (!orderData.userId || !orderData.items || orderData.items.length === 0) {
    throw new Error('Invalid order data');
  }

  // Calculate total
  const total = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Check inventory
  const inventoryCheck = await inventoryService.checkAvailability(orderData.items);
  if (!inventoryCheck.available) {
    throw new Error(`Items not available: ${inventoryCheck.unavailableItems.join(', ')}`);
  }

  // Process payment
  const paymentResult = await paymentService.charge({
    amount: total,
    userId: orderData.userId,
    currency: 'PHP'
  });

  if (!paymentResult.success) {
    throw new Error('Payment failed');
  }

  // Deduct from inventory
  await inventoryService.deduct(orderData.items);

  // Send confirmation email
  await emailService.send({
    to: orderData.userEmail,
    subject: 'Order Confirmation',
    body: `Your order #${paymentResult.orderId} has been confirmed!`
  });

  return {
    orderId: paymentResult.orderId,
    total: total,
    status: 'confirmed'
  };
}