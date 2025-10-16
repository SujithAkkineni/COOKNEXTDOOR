const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with fallback
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cooknextdoor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.log('⚠️ MongoDB connection failed, running in demo mode');
    console.log('To enable full functionality, please set up MongoDB Atlas or local MongoDB');
    console.log('Demo mode: Authentication and basic features will work with mock data');
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/meals', require('./routes/meals'));
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
  res.send('Cook Next Door API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
