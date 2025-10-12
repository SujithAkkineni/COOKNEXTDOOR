const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { auth } = require('../middleware/auth.middleware');

// Get reviews for a restaurant (public)
router.get('/restaurant/:restaurantId', reviewController.getRestaurantReviews);

// Protected routes
router.use(auth);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;