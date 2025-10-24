const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Book = require('./models/Book');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@library.com',
      password: 'password123',
      role: 'user'
    });
    await regularUser.save();
    console.log('Regular user created');

    // Create sample books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        isbn: '978-0-7432-7356-5',
        copiesAvailable: 3,
        totalCopies: 3,
        description: 'A classic American novel set in the Jazz Age.',
        publishedYear: 1925
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        category: 'Fiction',
        isbn: '978-0-06-112008-4',
        copiesAvailable: 2,
        totalCopies: 2,
        description: 'A gripping tale of racial injustice and childhood innocence.',
        publishedYear: 1960
      },
      {
        title: '1984',
        author: 'George Orwell',
        category: 'Dystopian Fiction',
        isbn: '978-0-452-28423-4',
        copiesAvailable: 4,
        totalCopies: 4,
        description: 'A dystopian social science fiction novel.',
        publishedYear: 1949
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        category: 'Romance',
        isbn: '978-0-14-143951-8',
        copiesAvailable: 2,
        totalCopies: 2,
        description: 'A romantic novel of manners.',
        publishedYear: 1813
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        category: 'Fiction',
        isbn: '978-0-316-76948-0',
        copiesAvailable: 1,
        totalCopies: 1,
        description: 'A controversial novel about teenage rebellion.',
        publishedYear: 1951
      },
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        category: 'Fantasy',
        isbn: '978-0-7475-3269-9',
        copiesAvailable: 5,
        totalCopies: 5,
        description: 'The first book in the Harry Potter series.',
        publishedYear: 1997
      },
      {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        isbn: '978-0-544-00341-5',
        copiesAvailable: 3,
        totalCopies: 3,
        description: 'An epic high fantasy novel.',
        publishedYear: 1954
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        category: 'Fantasy',
        isbn: '978-0-547-92822-7',
        copiesAvailable: 2,
        totalCopies: 2,
        description: 'A children\'s fantasy novel and prelude to The Lord of the Rings.',
        publishedYear: 1937
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
        category: 'Science Fiction',
        isbn: '978-0-441-17271-9',
        copiesAvailable: 2,
        totalCopies: 2,
        description: 'A science fiction novel set in the distant future.',
        publishedYear: 1965
      },
      {
        title: 'The Hitchhiker\'s Guide to the Galaxy',
        author: 'Douglas Adams',
        category: 'Science Fiction',
        isbn: '978-0-345-39180-3',
        copiesAvailable: 3,
        totalCopies: 3,
        description: 'A comedy science fiction series.',
        publishedYear: 1979
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        category: 'Non-Fiction',
        isbn: '978-0-06-231609-7',
        copiesAvailable: 2,
        totalCopies: 2,
        description: 'A narrative of humanity\'s creation and evolution.',
        publishedYear: 2011
      },
      {
        title: 'Educated',
        author: 'Tara Westover',
        category: 'Biography',
        isbn: '978-0-399-59050-4',
        copiesAvailable: 1,
        totalCopies: 1,
        description: 'A memoir about education and family.',
        publishedYear: 2018
      }
    ];

    await Book.insertMany(books);
    console.log('Sample books created');

    console.log('\n=== Seeding completed successfully! ===');
    console.log('\nDefault login credentials:');
    console.log('Admin: admin@library.com / password123');
    console.log('User: user@library.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
