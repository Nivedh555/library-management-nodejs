# Library Management System (LMS)

A comprehensive library management system built with React.js frontend and Node.js/Express backend with MongoDB database.

## Features

### Admin Features
- **Dashboard**: Overview of library statistics and recent activity
- **Book Management**: Add, edit, delete, and search books
- **User Management**: View, edit, and manage user accounts
- **Issued Books**: Track all borrowed books and overdue items
- **Statistics**: View comprehensive library analytics

### User Features
- **Dashboard**: Personal overview of borrowed books and activity
- **Browse Books**: Search and filter available books
- **Borrow Books**: Borrow available books (up to 5 at a time)
- **My Books**: Manage currently borrowed books
- **Return Books**: Return borrowed books
- **History**: View complete borrowing history
- **Fines**: Track and view any outstanding fines

## Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## Project Structure

```
library-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── userController.js
│   │   └── borrowController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Borrow.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── userRoutes.js
│   │   └── borrowRoutes.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Database Setup

1. Make sure MongoDB is running on your system
2. The application will automatically create the database and collections
3. You can use MongoDB Compass to view the data

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (Admin)
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)
- `GET /api/books/stats` - Get book statistics (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/stats` - Get user statistics (Admin)

### Borrowing
- `POST /api/borrow/borrow/:bookId` - Borrow a book
- `POST /api/borrow/return/:bookId` - Return a book
- `GET /api/borrow/my-borrows` - Get user's borrows
- `GET /api/borrow/all` - Get all borrows (Admin)
- `GET /api/borrow/stats` - Get borrow statistics (Admin)
- `PUT /api/borrow/update-overdue` - Update overdue status (Admin)

## Default Credentials

For testing purposes, you can create admin and user accounts:

**Admin Account:**
- Email: admin@library.com
- Password: password123
- Role: admin

**User Account:**
- Email: user@library.com
- Password: password123
- Role: user

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected routes
- Automatic token refresh

### Book Management
- CRUD operations for books
- Search and filter functionality
- Category-based organization
- Availability tracking
- ISBN validation

### User Management
- User registration and profile management
- Admin can manage all users
- Borrowing history tracking
- Fine calculation and tracking

### Borrowing System
- 14-day borrowing period
- Maximum 5 books per user
- Automatic overdue detection
- Fine calculation ($5 per day)
- Return processing

### Dashboard & Analytics
- Real-time statistics
- Visual data representation
- Recent activity tracking
- Performance metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository.
