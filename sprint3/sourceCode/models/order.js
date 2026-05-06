let orderHistory = [];
let nextOrderId = 1;

let currentOrder = {
  items: [],
  totalAmount: 0,
  status: "Open"
};

module.exports = {
  getCurrentOrder: () => currentOrder,
  getCurrentTotal: () => currentOrder.totalAmount,
  getCurrentItemCount: () => currentOrder.items.length,
  confirmCartToOrder: () => {
    const Cart = require('./cart');
    const cartItems = Cart.getCart();

    if (cartItems.length === 0) return null;

    cartItems.forEach(cartItem => {
      const existingItem = currentOrder.items.find(i => i.menuId === cartItem.menuId);
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        currentOrder.items.push({ ...cartItem });
      }
    });

    currentOrder.totalAmount += Cart.calculateTotal();
    
    Cart.clearAll();
    return currentOrder;
  },
  getOrderHistory: () => orderHistory,
  getOrderHistoryCount: () => orderHistory.length,
  checkout: () => {
    if (currentOrder.items.length === 0) return null;

    const completedOrder = {
      orderId: nextOrderId++, 
      items: [...currentOrder.items],
      totalAmount: currentOrder.totalAmount,
      status: "Paid",
      paymentDate: new Date()
    };

    orderHistory.push(completedOrder);

    currentOrder = { items: [], totalAmount: 0, status: "Open" };

    return completedOrder;
  },
  clearAll: () => {
    orderHistory.length = 0; 
    nextOrderId = 1;
    currentOrder.items = [];
    currentOrder.totalAmount = 0;
    currentOrder.status = "Open";
  },
}