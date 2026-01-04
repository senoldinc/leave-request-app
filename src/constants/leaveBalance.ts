import { LeaveBalance } from '../types';

// Mock veri - Gerçek uygulamada API'den gelecek
export const MOCK_LEAVE_BALANCE: LeaveBalance = {
  totalDays: 20,                                    // Toplam yıllık izin hakkı
  usedDays: 8,                                      // Kullanılan izin
  remainingDays: 12,                                // Kalan izin (20 - 8)
  carriedOverDays: 5,                               // Geçen yıldan devreden
  carriedOverDate: new Date(2024, 0, 1),           // 1 Ocak 2024
  nextAccrualDate: new Date(2025, 6, 1),           // 1 Temmuz 2025
  nextAccrualDays: 10,                              // Eklenecek izin günü
};
