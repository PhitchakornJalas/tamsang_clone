const Cart = require('../models/cart');
const Menu = require('../models/menu');

// Add Count Method
describe('Count Cart Item', () => {
    test('default cart item count', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(2, 1);
      Cart.addToCart(3, 1);
      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(3);
    })

    test('add cart item count when dup item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(1, 1);
      const cart = Cart.getCart();
      const cartItemCount = Cart.getCartItemCount();
      expect(cart[0]["quantity"]).toEqual(2);
      expect(cartItemCount).toEqual(1);
    })

    test('add cart item count when before item > after item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 2);
      Cart.addToCart(1, 1);
      const cart = Cart.getCart();
      const cartItemCount = Cart.getCartItemCount();
      expect(cart[0]["quantity"]).toEqual(3);
      expect(cartItemCount).toEqual(1);
    })

    test('add cart item count when before item < after item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 1);
      Cart.addToCart(1, 2);
      const cart = Cart.getCart();
      const cartItemCount = Cart.getCartItemCount();
      expect(cart[0]["quantity"]).toEqual(3);
      expect(cartItemCount).toEqual(1);
    })

    test('add cart item count when no item in menu', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(4, 1);
      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })

    test('clear cart item and count', () => {
      Cart.clearAll();
      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })
})

// Remove Item Cart
describe('Remove Item Cart', () => {
    test('remove cart item 1 qty', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 2);
      Cart.addToCart(1);
      const item = Cart.removeFromCart(1);

      const cartItemCount = Cart.getCartItemCount();
      expect(item.quantity).toEqual(2);
      expect(cartItemCount).toEqual(1);
    })

    test('remove cart item 2 qty', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1);
      Cart.addToCart(1);
      Cart.removeFromCart(1);
      Cart.removeFromCart(1);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })

    test('remove cart item out of item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.removeFromCart(1);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(0);
    })

    test('remove cart item all id 1', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1, 2);
      Cart.addToCart(1);
      Cart.addToCart(2);
      Cart.deleteItemCompletely(1);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(1);
    })

    test('remove cart item all id 2', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(1);
      Cart.addToCart(1);
      Cart.addToCart(2);
      Cart.deleteItemCompletely(2);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(1);
    })

    test('remove cart item all out of item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 50);
      Menu.create("ผัดกระเพรา3", 1, 50);

      Cart.clearAll();
      Cart.addToCart(2);
      Cart.deleteItemCompletely(1);

      const cartItemCount = Cart.getCartItemCount();
      expect(cartItemCount).toEqual(1);
    })
})

// Calculate Total
describe('Calculate Total', () => {
    test('default Calculate', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 60);
      Menu.create("ผัดกระเพรา3", 1, 70);

      Cart.clearAll();
      Cart.addToCart(1, 2);
      Cart.addToCart(2);

      const totalPrice = Cart.calculateTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(totalPrice).toEqual(160);
      expect(cartItemCount).toEqual(2);
    })

    test('Calculate without item', () => {
      Menu.clearAll();
      Menu.create("ผัดกระเพรา1", 1, 50);
      Menu.create("ผัดกระเพรา2", 1, 60);
      Menu.create("ผัดกระเพรา3", 1, 70);

      Cart.clearAll();

      const totalPrice = Cart.calculateTotal();
      const cartItemCount = Cart.getCartItemCount();
      expect(totalPrice).toEqual(0);
      expect(cartItemCount).toEqual(0);
    })
})
