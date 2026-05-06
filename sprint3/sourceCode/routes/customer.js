const express = require('express');
const router = express.Router(); 

const customerController = require('../controllers/customerController');

router.get('/', customerController.getAll);
router.get('/promotions', customerController.getPromotionMenu);
router.get('/menu/:id', customerController.getDetail);
router.post('/cart/add', customerController.addToCart);
router.post('/cart/remove', customerController.removeToCart);
router.get('/cart', customerController.getCartPage);
router.post('/order/add', customerController.confirmOrder);
router.post('/order/checkout', customerController.checkout);
router.get('/order', customerController.getOrder);

module.exports = router;