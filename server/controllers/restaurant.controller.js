const Restaurant = require('../models/restaurant.model');
const MenuItem = require('../models/menuItem.model');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const { cuisine, search } = req.query;
    let query = {};

    if (cuisine) {
      query.cuisine = cuisine;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } }
      ];
    }

    const restaurants = await Restaurant.find(query)
      .populate('owner', 'name')
      .select('-__v');
    
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name')
      .select('-__v');
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
};

// Create restaurant
exports.createRestaurant = async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'restaurant') {
      return res.status(403).json({ message: 'Not authorized to create restaurant' });
    }

    const restaurant = new Restaurant({
      ...req.body,
      owner: req.user.userId
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant' });
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update restaurant' });
    }

    Object.assign(restaurant, req.body);
    await restaurant.save();
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant' });
  }
};

// Get restaurant menu
exports.getRestaurantMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurantId: req.params.id })
      .select('-__v')
      .sort('category');
    
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu' });
  }
};

// Add menu item
exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update menu' });
    }

    const menuItem = new MenuItem({
      ...req.body,
      restaurantId: req.params.id
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item' });
  }
};