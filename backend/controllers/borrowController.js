const supabase = require('../config/supabase');

const borrowBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const { data: activeBorrows } = await supabase
      .from('borrows')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'borrowed');

    if (activeBorrows && activeBorrows.length >= 5) {
      return res.status(400).json({ message: 'Maximum borrow limit (5 books) reached' });
    }

    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', bookId)
      .single();

    if (bookError || !book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.available_copies <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const { data: borrow, error: borrowError } = await supabase
      .from('borrows')
      .insert([{
        user_id: userId,
        book_id: bookId,
        due_date: dueDate.toISOString(),
        status: 'borrowed'
      }])
      .select()
      .single();

    if (borrowError) {
      console.error('Borrow insert error:', borrowError);
      return res.status(500).json({ message: 'Error borrowing book' });
    }

    const { error: updateError } = await supabase
      .from('books')
      .update({ available_copies: book.available_copies - 1 })
      .eq('id', bookId);

    if (updateError) {
      console.error('Book update error:', updateError);
    }

    res.status(201).json({
      message: 'Book borrowed successfully',
      borrow
    });
  } catch (error) {
    console.error('Borrow book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const returnBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const { data: borrow, error: borrowError } = await supabase
      .from('borrows')
      .select('*, books(*)')
      .eq('user_id', userId)
      .eq('book_id', bookId)
      .eq('status', 'borrowed')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (borrowError || !borrow) {
      return res.status(404).json({ message: 'No active borrow record found' });
    }

    const returnDate = new Date();
    const dueDate = new Date(borrow.due_date);
    let fineAmount = 0;

    if (returnDate > dueDate) {
      const daysLate = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fineAmount = daysLate * 5;
    }

    const { error: updateBorrowError } = await supabase
      .from('borrows')
      .update({
        return_date: returnDate.toISOString(),
        status: 'returned',
        fine_amount: fineAmount
      })
      .eq('id', borrow.id);

    if (updateBorrowError) {
      console.error('Borrow update error:', updateBorrowError);
      return res.status(500).json({ message: 'Error updating borrow record' });
    }

    const { error: updateBookError } = await supabase
      .from('books')
      .update({ available_copies: borrow.books.available_copies + 1 })
      .eq('id', bookId);

    if (updateBookError) {
      console.error('Book update error:', updateBookError);
    }

    res.json({
      message: 'Book returned successfully',
      fineAmount
    });
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyBorrows = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: borrows, error } = await supabase
      .from('borrows')
      .select('*, books(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get borrows error:', error);
      return res.status(500).json({ message: 'Error fetching borrows' });
    }

    res.json({ borrows: borrows || [] });
  } catch (error) {
    console.error('Get my borrows error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllBorrows = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('borrows').select('*, users(name, email), books(title, author, isbn)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: borrows, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Get all borrows error:', error);
      return res.status(500).json({ message: 'Error fetching borrows' });
    }

    res.json({
      borrows: borrows || [],
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: parseInt(page),
      total: count || 0
    });
  } catch (error) {
    console.error('Get all borrows error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOverdueStatus = async (req, res) => {
  try {
    const currentDate = new Date();

    const { data: overdueBorrows } = await supabase
      .from('borrows')
      .select('*')
      .eq('status', 'borrowed')
      .lt('due_date', currentDate.toISOString());

    if (overdueBorrows && overdueBorrows.length > 0) {
      for (const borrow of overdueBorrows) {
        await supabase
          .from('borrows')
          .update({ status: 'overdue' })
          .eq('id', borrow.id);
      }
    }

    res.json({
      message: 'Overdue status updated',
      updatedCount: overdueBorrows?.length || 0
    });
  } catch (error) {
    console.error('Update overdue error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBorrowStats = async (req, res) => {
  try {
    const { data: allBorrows } = await supabase
      .from('borrows')
      .select('*');

    const totalBorrows = allBorrows?.length || 0;
    const activeBorrows = allBorrows?.filter(b => b.status === 'borrowed').length || 0;
    const overdueBorrows = allBorrows?.filter(b => b.status === 'overdue').length || 0;
    const returnedBorrows = allBorrows?.filter(b => b.status === 'returned').length || 0;

    const totalFines = allBorrows?.reduce((sum, b) => sum + (parseFloat(b.fine_amount) || 0), 0) || 0;

    res.json({
      totalBorrows,
      activeBorrows,
      overdueBorrows,
      returnedBorrows,
      totalFines
    });
  } catch (error) {
    console.error('Get borrow stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  updateOverdueStatus,
  getBorrowStats
};
