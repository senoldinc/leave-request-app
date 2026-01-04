export interface PublicHoliday {
  date: Date;
  name: string;
  nameEn: string;
}

export interface LeaveDay {
  date: Date;
  status: 'approved' | 'pending';
  type: string;
}

export const TURKISH_HOLIDAYS_2025: PublicHoliday[] = [
  { date: new Date(2025, 0, 1), name: 'Yılbaşı', nameEn: 'New Year\'s Day' },
  { date: new Date(2025, 3, 23), name: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı', nameEn: 'National Sovereignty and Children\'s Day' },
  { date: new Date(2025, 4, 1), name: 'İşçi Bayramı', nameEn: 'Labour Day' },
  { date: new Date(2025, 4, 19), name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', nameEn: 'Commemoration of Atatürk, Youth and Sports Day' },
  { date: new Date(2025, 6, 15), name: 'Demokrasi ve Milli Birlik Günü', nameEn: 'Democracy and National Unity Day' },
  { date: new Date(2025, 7, 30), name: 'Zafer Bayramı', nameEn: 'Victory Day' },
  { date: new Date(2025, 9, 29), name: 'Cumhuriyet Bayramı', nameEn: 'Republic Day' },
  // Ramazan Bayramı 2025 (30 Mart - 1 Nisan)
  { date: new Date(2025, 2, 30), name: 'Ramazan Bayramı 1. Gün', nameEn: 'Ramadan Feast Day 1' },
  { date: new Date(2025, 2, 31), name: 'Ramazan Bayramı 2. Gün', nameEn: 'Ramadan Feast Day 2' },
  { date: new Date(2025, 3, 1), name: 'Ramazan Bayramı 3. Gün', nameEn: 'Ramadan Feast Day 3' },
  // Kurban Bayramı 2025 (6-9 Haziran)
  { date: new Date(2025, 5, 6), name: 'Kurban Bayramı 1. Gün', nameEn: 'Sacrifice Feast Day 1' },
  { date: new Date(2025, 5, 7), name: 'Kurban Bayramı 2. Gün', nameEn: 'Sacrifice Feast Day 2' },
  { date: new Date(2025, 5, 8), name: 'Kurban Bayramı 3. Gün', nameEn: 'Sacrifice Feast Day 3' },
  { date: new Date(2025, 5, 9), name: 'Kurban Bayramı 4. Gün', nameEn: 'Sacrifice Feast Day 4' },
];

// Mock onaylanmış izinler
export const MOCK_APPROVED_LEAVES: LeaveDay[] = [
  { date: new Date(2025, 1, 10), status: 'approved', type: 'annual' },
  { date: new Date(2025, 1, 11), status: 'approved', type: 'annual' },
  { date: new Date(2025, 1, 12), status: 'approved', type: 'annual' },
];

// Mock onay bekleyen izinler
export const MOCK_PENDING_LEAVES: LeaveDay[] = [
  { date: new Date(2025, 2, 15), status: 'pending', type: 'personal' },
  { date: new Date(2025, 2, 16), status: 'pending', type: 'personal' },
];

// Renk paleti
export const CALENDAR_COLORS = {
  weekend: {
    background: '#fef2f2',
    text: '#dc2626',
    label: 'Hafta Sonu / Weekend',
  },
  publicHoliday: {
    background: '#fef3c7',
    text: '#d97706',
    border: '#fbbf24',
    label: 'Resmi Tatil / Public Holiday',
  },
  approvedLeave: {
    background: '#dcfce7',
    text: '#16a34a',
    border: '#22c55e',
    label: 'Onaylanan İzin / Approved Leave',
  },
  pendingLeave: {
    background: '#e0e7ff',
    text: '#4f46e5',
    border: '#6366f1',
    label: 'Onay Bekleyen / Pending Approval',
  },
  selectedRange: {
    background: '#dbeafe',
    text: '#1e40af',
    label: 'Seçilen Aralık / Selected Range',
  },
  selectedEdge: {
    background: '#3b82f6',
    text: '#ffffff',
    border: '#93c5fd',
    label: 'Başlangıç/Bitiş / Start/End',
  },
};
