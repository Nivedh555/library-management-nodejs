const supabase = require('../config/supabase');

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('users').select('id, name, email, role, created_at, updated_at', { count: 'exact' });

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data: users, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }

    res.json({
      users: users || [],
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: parseInt(page),
      total: count || 0
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at, updated_at')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { data: borrowHistory } = await supabase
      .from('borrows')
      .select('*, books(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    res.json({
      ...user,
      borrowHistory: borrowHistory || []
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({ name, email, role })
      .eq('id', req.params.id)
      .select('id, name, email, role, created_at, updated_at')
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      console.error('Supabase delete error:', error);
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');

    if (usersError) {
      return res.status(500).json({ message: 'Error fetching stats' });
    }

    const totalUsers = users?.length || 0;
    const adminUsers = users?.filter(u => u.role === 'admin').length || 0;
    const regularUsers = users?.filter(u => u.role === 'user').length || 0;

    const { data: borrows } = await supabase
      .from('borrows')
      .select('*')
      .eq('status', 'borrowed');

    const activeUsers = new Set(borrows?.map(b => b.user_id) || []).size;

    res.json({
      totalUsers,
      adminUsers,
      regularUsers,
      activeUsers
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
};
