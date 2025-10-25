const { validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('books').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,isbn.ilike.%${search}%`);
    }

    if (category) {
      query = query.ilike('category', `%${category}%`);
    }

    const { data: books, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({ message: 'Error fetching books' });
    }

    res.json({
      books: books || [],
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: parseInt(page),
      total: count || 0
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  try {
    const { data: book, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error || !book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, isbn, category, description, publisher, publication_year, total_copies } = req.body;

    const { data: book, error } = await supabase
      .from('books')
      .insert([{
        title,
        author,
        isbn,
        category,
        description,
        publisher,
        publication_year,
        total_copies: total_copies || 1,
        available_copies: total_copies || 1
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Book with this ISBN already exists' });
      }
      return res.status(500).json({ message: 'Error creating book' });
    }

    res.status(201).json({
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, isbn, category, description, publisher, publication_year, total_copies, available_copies } = req.body;

    const { data: book, error } = await supabase
      .from('books')
      .update({
        title,
        author,
        isbn,
        category,
        description,
        publisher,
        publication_year,
        total_copies,
        available_copies
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      message: 'Book updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookStats = async (req, res) => {
  try {
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('*');

    if (booksError) {
      return res.status(500).json({ message: 'Error fetching stats' });
    }

    const totalBooks = books.length;
    const totalCopies = books.reduce((sum, book) => sum + (book.total_copies || 0), 0);
    const availableCopies = books.reduce((sum, book) => sum + (book.available_copies || 0), 0);
    const borrowedCopies = totalCopies - availableCopies;

    const { data: categories } = await supabase
      .from('books')
      .select('category')
      .order('category');

    const uniqueCategories = [...new Set(categories?.map(c => c.category) || [])];

    res.json({
      totalBooks,
      totalCopies,
      availableCopies,
      borrowedCopies,
      totalCategories: uniqueCategories.length
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookStats
};
