export const calculateBusinessDays = (startDate: Date | null, endDate: Date | null): number => {
  if (!startDate || !endDate) return 0;
  let count = 0;
  const current = new Date(startDate);
  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
};

export const formatDate = (date: Date | null, language: 'tr' | 'en'): string => {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', options);
};

export const generateSelectedDates = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};
