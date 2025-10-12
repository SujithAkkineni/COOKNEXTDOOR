const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const { auth, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/:id/menu', restaurantController.getRestaurantMenu);

// Protected routes
router.post('/', auth, authorize('admin', 'restaurant'), restaurantController.createRestaurant);
router.put('/:id', auth, authorize('admin', 'restaurant'), restaurantController.updateRestaurant);
router.post('/:id/menu', auth, authorize('admin', 'restaurant'), restaurantController.addMenuItem);

module.exports = router;