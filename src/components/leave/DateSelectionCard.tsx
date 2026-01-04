import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Translations } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface DateSelectionCardProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date, isStart: boolean) => void;
  businessDays: number;
  t: Translations;
  language: 'tr' | 'en';
}

const isMobile = window.innerWidth < 640;

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

export const DateSelectionCard: React.FC<DateSelectionCardProps> = ({
  startDate,
  endDate,
  onDateSelect,
  businessDays,
  t,
  language,
}) => {
  const [baseMonth, setBaseMonth] = useState<Date>(startOfMonth(startDate ?? new Date()));
  const [open, setOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    padding: isMobile ? '16px' : '24px',
    border: '1px solid #f3f4f6',
    marginBottom: isMobile ? '16px' : '24px',
  } as const;

  const months = useMemo(() => [baseMonth, addMonths(baseMonth, 1)], [baseMonth]);

  // Drag range selection state
  const [mouseDown, setMouseDown] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Date | null>(null);
  const [dragCurrent, setDragCurrent] = useState<Date | null>(null);

  const dateOnlyTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const inPreviewRange = (d: Date): boolean => {
    if (!dragging || !dragStart || !dragCurrent) return false;
    const a = dateOnlyTime(dragStart);
    const b = dateOnlyTime(dragCurrent);
    const t = dateOnlyTime(d);
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return t >= min && t <= max;
  };

  const getMonthMatrix = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay();
    const cells: (Date | null)[] = [];

    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    // Fill to complete last week
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  };

  const isSameDay = (a: Date | null, b: Date | null) => {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };

  const isInRange = (d: Date) => {
    if (!startDate || !endDate) return false;
    const t0 = startDate.getTime();
    const t1 = endDate.getTime();
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    return t >= t0 && t <= t1;
  };

  useEffect(() => {
    // Close when clicking outside
    const onDocClick = (e: MouseEvent) => {
      if (!open) return;
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const navButtonStyle: React.CSSProperties = {
    padding: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '6px',
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Calendar color="#3b82f6" size={24} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{t.dates.title}</h2>
      </div>

      {/* Collapsed Range Display */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: 600 as const, color: '#374151', marginBottom: '8px' }}>
          {t.dates.startDate} - {t.dates.endDate}
        </label>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: '12px 14px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: '#374151' }}>
            {startDate && endDate
              ? `${formatDate(startDate, language)} — ${formatDate(endDate, language)}`
              : language === 'tr' ? 'Tarih aralığı seçin' : 'Select date range'}
          </span>
          <span style={{ color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div
            ref={popoverRef}
            style={{
              position: 'relative',
              marginTop: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px',
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
            }}
          >
            <div style={{ display: 'flex', gap: '16px', flexDirection: isMobile ? 'column' as const : 'row' as const }}>
              {months.map((m, idx) => {
                const cells = getMonthMatrix(m);
                const header = (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    {idx === 0 ? (
                      <button
                        type="button"
                        style={navButtonStyle}
                        onClick={() => setBaseMonth(addMonths(baseMonth, -1))}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        ←
                      </button>
                    ) : <div style={{ width: 32 }} />}
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>
                      {t.months[m.getMonth()]} {m.getFullYear()}
                    </div>
                    {idx === months.length - 1 ? (
                      <button
                        type="button"
                        style={navButtonStyle}
                        onClick={() => setBaseMonth(addMonths(baseMonth, 1))}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        →
                      </button>
                    ) : <div style={{ width: 32 }} />}
                  </div>
                );

                return (
                  <div key={idx} style={{ flex: 1, minWidth: 260 }}>
                    {header}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '12px', marginBottom: '6px' }}>
                      {t.days.map((d) => (
                        <div key={d} style={{ fontWeight: 600, color: '#6b7280', padding: '4px' }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                      {cells.map((cell, i) => {
                        if (!cell) return <div key={i} style={{ aspectRatio: '1' }} />;
                        const selectedStart = isSameDay(cell, startDate);
                        const selectedEnd = isSameDay(cell, endDate);
                        const inRange = isInRange(cell);

                        let bg = 'transparent';
                        let color = '#374151';
                        let border = '1px solid #e5e7eb';
                        let fontWeight: React.CSSProperties['fontWeight'] = '500';

                        if (selectedStart || selectedEnd) {
                          bg = '#2563eb';
                          color = 'white';
                          border = '2px solid #1d4ed8';
                          fontWeight = '700';
                        } else if (inRange) {
                          bg = '#dbeafe';
                          color = '#1f2937';
                          border = '1px solid #bfdbfe';
                          fontWeight = '600';
                        }

                        const handleSelect = () => {
                          // Single click behavior: do NOT auto-close; allow two-click selection
                          if (!startDate || (startDate && endDate)) {
                            onDateSelect(cell, true);
                          } else {
                            if (cell < startDate) onDateSelect(cell, true);
                            else onDateSelect(cell, false);
                          }
                        };

                        const handleMouseDown = (e: React.MouseEvent) => {
                          e.preventDefault();
                          setMouseDown(true);
                          setDragging(false);
                          setDragStart(cell);
                          setDragCurrent(cell);
                        };

                        const handleMouseEnter = () => {
                          if (mouseDown) {
                            // start dragging on first move after mousedown
                            setDragging(true);
                            setDragCurrent(cell);
                          }
                        };

                        const handleMouseUp = () => {
                          if (dragging && dragStart) {
                            // Commit drag range selection
                            const start = dateOnlyTime(dragStart);
                            const end = dateOnlyTime(cell);
                            // Set start first (min), then end (max)
                            const min = Math.min(start, end);
                            const max = Math.max(start, end);
                            const startDateObj = new Date(min);
                            const endDateObj = new Date(max);
                            onDateSelect(startDateObj, true);
                            onDateSelect(endDateObj, false);
                            setOpen(false);
                          }
                          setMouseDown(false);
                          setDragging(false);
                          setDragStart(null);
                          setDragCurrent(null);
                        };

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={handleSelect}
                            onMouseDown={handleMouseDown}
                            onMouseEnter={handleMouseEnter}
                            onMouseUp={handleMouseUp}
                            style={{
                              aspectRatio: '1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              borderRadius: '8px',
                              transition: 'all 0.15s',
                              background: (dragging && inPreviewRange(cell)) || selectedStart || selectedEnd ? (selectedStart || selectedEnd ? '#2563eb' : '#dbeafe') : bg,
                              color: selectedStart || selectedEnd ? 'white' : color,
                              border,
                              cursor: 'pointer',
                            }}
                            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => { if (!inRange && !selectedStart && !selectedEnd && !dragging) (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6'; }}
                            onMouseLeave={(e) => { if (!inRange && !selectedStart && !selectedEnd && !dragging) e.currentTarget.style.background = 'transparent'; }}
                          >
                            {cell.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
              <span>💡</span>
              <span>
                {language === 'tr' ? 'İpucu: Önce giriş tarihini, sonra çıkış tarihini seçin' : 'Tip: Click check-in, then check-out'}
              </span>
            </div>
          </div>
        )}
      </div>

      {startDate && endDate && (
        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#dbeafe', borderRadius: '8px', border: '1px solid #93c5fd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>
                <span style={{ fontWeight: 600 }}>{formatDate(startDate, language)}</span>
                {' - '}
                <span style={{ fontWeight: 600 }}>{formatDate(endDate, language)}</span>
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                {language === 'tr' ? '(Hafta sonları hariç)' : '(Excluding weekends)'}
              </span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
              {businessDays} {t.dates.businessDays}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
