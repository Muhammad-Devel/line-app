import api from './api';

export const statsService = {
  // Kunlik statistika (Endpoint 20)
  getDaily: (date?: string) => 
    api.get('/admin/statistics/daily', { params: { date } }).then(res => res.data.statistics),

  // Oylik statistika (Endpoint 21)
  getMonthly: (year: number, month: number) => 
    api.get('/admin/statistics/monthly', { params: { year, month } }).then(res => res.data.statistics)
};