const Order = require('../models/order');
const Cart = require('../models/cart');
const Menu = require('../models/menu');

// Add Cart To Order Method
describe('add cart to order', () => {
    test('default add cart to order', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();

      const orderItemCount = Order.getCurrentItemCount();
      const orderTotalAmount = Order.getCurrentTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(orderItemCount).toEqual(3);
      expect(orderTotalAmount).toEqual(150);
      expect(cartItemCount).toEqual(0);
    })

    test('add cart to order when order have item dup', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();

      Cart.addToCart(1, 1);
      Cart.addToCart(2, 2);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();
      orderItemCount = Order.getCurrentItemCount();
      orderTotalAmount = Order.getCurrentTotal();
      expect(orderItemCount).toEqual(3);
      expect(orderTotalAmount).toEqual(350);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })

    test('add cart to order when cart null', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();

      Order.confirmCartToOrder();
      orderItemCount = Order.getCurrentItemCount();
      orderTotalAmount = Order.getCurrentTotal();
      expect(orderItemCount).toEqual(3);
      expect(orderTotalAmount).toEqual(150);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })
})

// Checkout Order Method
describe('checkout order', () => {
    test('default checkout order', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();

      const bill = Order.checkout();
      const orderHistoryCount = Order.getOrderHistoryCount();
      expect(bill.orderId).toEqual(1);
      expect(bill.items.length).toEqual(3);
      expect(bill.status).toEqual("Paid");
      expect(bill.totalAmount).toEqual(150);
      expect(orderHistoryCount).toEqual(1);

      const orderItemCount = Order.getCurrentItemCount();
      const orderTotalAmount = Order.getCurrentTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(orderItemCount).toEqual(0);
      expect(orderTotalAmount).toEqual(0);
      expect(cartItemCount).toEqual(0);
    })

    test('checkout order when order item = 0', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();

      const bill = Order.checkout();
      const orderHistoryCount = Order.getOrderHistoryCount();
      expect(bill).toBeNull();
      expect(orderHistoryCount).toEqual(0);

      const orderItemCount = Order.getCurrentItemCount();
      const orderTotalAmount = Order.getCurrentTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(orderItemCount).toEqual(0);
      expect(orderTotalAmount).toEqual(0);
      expect(cartItemCount).toEqual(0);
    })

    test('checkout 2 order', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Order.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      Order.confirmCartToOrder();
      Order.checkout();

      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Order.confirmCartToOrder();
      Order.checkout();

      const bill = Order.getOrderHistory()
      const orderHistoryCount = Order.getOrderHistoryCount();
      expect(bill[0].orderId).toEqual(1);
      expect(bill[0].items.length).toEqual(3);
      expect(bill[0].status).toEqual("Paid");
      expect(bill[0].totalAmount).toEqual(150);
      expect(bill[1].orderId).toEqual(2);
      expect(bill[1].items.length).toEqual(2);
      expect(bill[1].status).toEqual("Paid");
      expect(bill[1].totalAmount).toEqual(100);

      expect(orderHistoryCount).toEqual(2);

      const orderItemCount = Order.getCurrentItemCount();
      const orderTotalAmount = Order.getCurrentTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(orderItemCount).toEqual(0);
      expect(orderTotalAmount).toEqual(0);
      expect(cartItemCount).toEqual(0);
    })
})