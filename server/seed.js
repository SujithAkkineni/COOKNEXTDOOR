const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Restaurant = require('./models/restaurant.model');
const MenuItem = require('./models/menuItem.model');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 8);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create restaurant owner
    const ownerPassword = await bcrypt.hash('owner123', 8);
    const owner = await User.create({
      name: 'Restaurant Owner',
      email: 'owner@example.com',
      password: ownerPassword,
      role: 'restaurant'
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 8);
    await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user'
    });

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: 'Test Restaurant',
      description: 'A great place to eat',
      cuisine: 'Italian',
      address: {
        street: '123 Food St',
        city: 'Foodtown',
        state: 'FD',
        zipCode: '12345'
      },
      owner: owner._id
    });

    // Create menu items
    const menuItems = [
      {
        name: 'Margherita Pizza',
        description: 'Classic tomato and mozzarella pizza',
        price: 12.99,
        category: 'Pizza',
        restaurantId: restaurant._id,
        available: true
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon and eggs',
        price: 14.99,
        category: 'Pasta',
        restaurantId: restaurant._id,
        available: true
      }
    ];

    await MenuItem.insertMany(menuItems);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();