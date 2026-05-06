let cart = [];

module.exports = {
  getCart: () => cart,
  getCartItemCount: ()=> cart.length,
  addToCart: (menuId, quantity = 1) => {
    const Menu = require('./menu'); 
    const menuInfo = Menu.selectById(menuId);

    if (!menuInfo) {
      return null;
    }

    const existingItem = cart.find(item => item.menuId === menuId);

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem = {
        menuId: menuInfo.id,
        name: menuInfo.name,
        price: menuInfo.price,
        quantity: quantity
      };
      cart.push(newItem);
      return newItem;
    }
  },
  removeFromCart: (menuId, quantityToRemove = 1) => {
    const index = cart.findIndex(item => item.menuId === menuId);

    if (index !== -1) {
      const item = cart[index];
      
      item.quantity -= quantityToRemove;

      if (item.quantity <= 0) {
        cart.splice(index, 1);
      }
      
      return item; 
    }
    return null; 
  },
  deleteItemCompletely: (id) => {
    const index = cart.findIndex(item => item.menuId === id);

    if (index !== -1) {
      const deletedItem = cart.splice(index, 1)[0];
      return deletedItem;
    }
    return null;
  },
  clearAll: () => {
    cart.length = 0;
  },
  calculateTotal: () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
};