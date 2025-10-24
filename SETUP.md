# Library Management System - Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 2. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd library-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library_management
```

### 4. Database Setup

```bash
# Make sure MongoDB is running (if using local MongoDB)
# For Windows: Start MongoDB service
# For Mac: brew services start mongodb-community
# For Linux: sudo systemctl start mongod

# Seed the database with sample data
cd backend
npm run seed
```

This will create:
- Admin user: `admin@library.com` / `password123`
- Regular user: `user@library.com` / `password123`
- Sample books in various categories

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

### 6. Access the Application

Open your browser and go to `http://localhost:3000`

**Login Credentials:**
- **Admin:** admin@library.com / password123
- **User:** user@library.com / password123

## Features Overview

### Admin Features
- Dashboard with library statistics
- Manage books (CRUD operations)
- Manage users
- View all issued books
- Track overdue books and fines

### User Features
- Personal dashboard
- Browse and search books
- Borrow books (up to 5 at a time)
- Return books
- View borrowing history
- Track fines

## API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@library.com","password":"password123"}'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in `.env`
   - For Atlas, ensure IP whitelist is configured

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **CORS Issues**
   - Ensure backend is running on port 5000
   - Check proxy setting in frontend package.json

4. **JWT Token Issues**
   - Clear browser localStorage
   - Ensure JWT_SECRET is set in `.env`

### Reset Database

To reset the database and start fresh:

```bash
cd backend
# This will clear all data and reseed
npm run seed
```

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development

2. **Database Viewing**: Use MongoDB Compass to view database contents:
   - Connection string: `mongodb://localhost:27017`
   - Database: `library_management`

3. **API Documentation**: All API endpoints are documented in the main README.md

4. **Logging**: Check console logs for debugging information

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend `.env`
2. Build the frontend: `npm run build`
3. Use a process manager like PM2 for the backend
4. Use a reverse proxy like Nginx
5. Use a cloud database like MongoDB Atlas
6. Set up proper environment variables

## Support

If you encounter any issues:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check the GitHub issues page
