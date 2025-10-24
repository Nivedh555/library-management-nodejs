import api from './axios';

export const borrowApi = {
  borrowBook: async (bookId) => {
    const response = await api.post(`/borrow/borrow/${bookId}`);
    return response.data;
  },

  returnBook: async (bookId) => {
    const response = await api.post(`/borrow/return/${bookId}`);
    return response.data;
  },

  getUserBorrows: async (params = {}) => {
    const response = await api.get('/borrow/my-borrows', { params });
    return response.data;
  },

  getAllBorrows: async (params = {}) => {
    const response = await api.get('/borrow/all', { params });
    return response.data;
  },

  getBorrowStats: async () => {
    const response = await api.get('/borrow/stats');
    return response.data;
  },

  updateOverdueStatus: async () => {
    const response = await api.put('/borrow/update-overdue');
    return response.data;
  },
};
