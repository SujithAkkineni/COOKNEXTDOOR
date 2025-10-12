const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { auth, authorize } = require('../middleware/auth.middleware');

// All routes are protected
router.use(auth);

router.post('/', orderController.createOrder);
router.get('/user', orderController.getUserOrders);
router.get('/restaurant', authorize('admin', 'restaurant'), orderController.getRestaurantOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', authorize('admin', 'restaurant'), orderController.updateOrderStatus);

module.exports = router;