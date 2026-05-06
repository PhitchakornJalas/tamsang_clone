const Menu = require('../models/menu');
const CategoryMenu = require('../models/categoryMenu');

module.exports = {
  getAll: (req, res) => {
    const menus = Menu.getAll();
    const categories = CategoryMenu.getAll().length > 0 ? CategoryMenu.getAll() : [{name: 'ไม่มีหมวดหมู่'}];

    const Cart = require('../models/cart');
    const cartItems = Cart.getCart();
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    const totalPrice = Cart.calculateTotal();
    
    res.render('customer/index', { menus, categories, totalQty, totalPrice });
  },
  getPromotionMenu: (req, res) => {
    const menus = Menu.showAll(); 
    const promotionMenus = menus.filter(item => {
        return item.category && item.category.id === 1;
    });

    res.render('customer/promotionPage', { promotionMenus });
  },
  getDetail: (req, res) => {
    const menuId = parseInt(req.params.id);
    const item = Menu.selectById(menuId);
    
    if (!item) return res.status(404).send('Menu not found');

    const Cart = require('../models/cart');
    const existingInCart = Cart.getCart().find(c => c.menuId === menuId);
    
    const currentQty = existingInCart ? existingInCart.quantity : 1;

    res.render('customer/detailMenu', { item, currentQty });
  },
  addToCart: (req, res) => {
    const { menuId, quantity, isUpdate } = req.body;
    const Cart = require('../models/cart');
    
    const id = parseInt(menuId);
    const qty = parseInt(quantity);
    
    if (isUpdate) {
        const existingItem = Cart.getCart().find(item => item.menuId === id);
        const currentQty = existingItem ? existingItem.quantity : 0;
      
        const diff = qty - currentQty;
        
        const result = Cart.addToCart(id, diff);
        
        if (result) return res.json({ success: true });
    } 
    else {
        const result = Cart.addToCart(id, qty);
        if (result) return res.json({ success: true });
    }

    return res.json({ success: false, message: 'เพิ่มไม่สำเร็จ' });
  },
  removeToCart: (req, res) => {
    try {
        const { menuId } = req.body;
        const Cart = require('../models/cart');

        const id = parseInt(menuId);

        const result = Cart.deleteItemCompletely(id);
        
        if (result) {
            return res.json({ success: true, message: 'Item removed' });
        } else {
            return res.status(400).json({ success: false, message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error("Remove Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  getCartPage: (req, res) => {
    const Cart = require('../models/cart');
    const cartItems = Cart.getCart();
    
    if (!cartItems || cartItems.length === 0) {
        return res.redirect('/customer'); 
    }

    const totalPrice = Cart.calculateTotal();
    res.render('customer/cart', { cartItems, totalPrice }); 
  },
  confirmOrder: (req, res) => {
    const Order = require('../models/order');
    const orderResult = Order.confirmCartToOrder();

    if (orderResult) {
        res.json({ 
            success: true, 
            message: 'ส่งรายการอาหารเรียบร้อย',
            orderId: orderResult.id 
        });
    } else {
        res.status(400).json({ 
            success: false, 
            message: 'ไม่มีรายการอาหารในตะกร้า' 
        });
    }
  },
  getOrder: (req, res) => {
    const Order = require('../models/order');
    const currentOrder = Order.getCurrentOrder();

    res.render('customer/order', { order: currentOrder });
  },
  checkout: (req, res) => {
    const Order = require('../models/order');
    
    const success = Order.checkout(); 

    if (success) {
        res.json({ success: true, message: 'Payment completed' });
    } else {
        res.status(500).json({ success: false, message: 'Checkout failed' });
    }
}
};
