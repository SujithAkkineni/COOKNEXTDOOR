# CookNextDoor - Full Stack Food Delivery Application

A modern full-stack application that connects home cooks with food lovers in their neighborhood.

## 🚀 Features

- **User Authentication**: Register and login as either a buyer or seller
- **Meal Management**: Sellers can add, edit, and manage their meals
- **Order System**: Buyers can browse and order meals from local sellers
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Real-time Updates**: Live updates when meals are added or orders are placed

## 🛠 Technology Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **Angular 20** with TypeScript
- **Angular Material** for UI components
- **SCSS** for styling
- **RxJS** for reactive programming

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v16 or higher)
2. **npm** (comes with Node.js)
3. **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Update `backend/.env` with your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cooknextdoor?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

1. Install MongoDB Community Edition for your OS
2. Start MongoDB service
3. The connection string in `.env` is already set for local MongoDB

### 3. Environment Configuration

Update `backend/.env` with your settings:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5001
```

### 4. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm start
```

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:4201
- **Backend API**: http://localhost:5001

## 🎯 How to Use

### For Buyers
1. **Register** as a buyer or **login** to your account
2. **Browse meals** from local sellers
3. **Place orders** for delicious homemade food
4. **Track your orders** in real-time

### For Sellers
1. **Register** as a seller or **login** to your account
2. **Add meals** to your menu with descriptions and prices
3. **Manage orders** from buyers
4. **Update order status** as you prepare and deliver

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Meals
- `GET /api/meals` - Get all meals
- `POST /api/meals` - Create new meal (sellers only)
- `PUT /api/meals/:id` - Update meal (seller only)
- `DELETE /api/meals/:id` - Delete meal (seller only)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

## 🎨 Design Features

- **Modern gradient backgrounds**
- **Glass-morphism effects**
- **Smooth animations and transitions**
- **Responsive design for all devices**
- **Professional typography**
- **Accessible UI components**

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to:
- **Heroku**
- **DigitalOcean**
- **AWS**
- **Railway**

### Frontend Deployment
The frontend can be deployed to:
- **Netlify**
- **Vercel**
- **Firebase Hosting**
- **GitHub Pages**

## 📝 Development Notes

- The application uses JWT tokens for authentication
- Passwords are hashed using bcryptjs
- MongoDB stores user data, meals, and orders
- Angular services handle API communication
- SCSS provides modern styling capabilities

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization

## 📞 Support

For issues or questions, please check the GitHub repository or create an issue.

---

**Happy Cooking! 🍳**
