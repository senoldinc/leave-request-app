import React, { useEffect, useState } from 'react';
import { Translations } from '../../types';
import { useLeaveRequestContext } from '../../contexts/LeaveRequestContext';
import { TURKISH_HOLIDAYS_2025, MOCK_APPROVED_LEAVES, MOCK_PENDING_LEAVES, CALENDAR_COLORS } from '../../types/calendar';
import { useLanguage } from '../../contexts/LanguageContext';

interface MiniCalendarProps {
  selectedDates: Date[];
  startDate: Date | null;
  endDate: Date | null;
  t: Translations;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ selectedDates, startDate, endDate, t }) => {
  const { calendarMonth, setCalendarMonth, handleDateSelect } = useLeaveRequestContext();
  const { language } = useLanguage();
  const currentMonth = calendarMonth;
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Year view overlay state
  const [yearOpen, setYearOpen] = useState<boolean>(false);
  const [yearBase, setYearBase] = useState<Date>(new Date(new Date().getFullYear(), 0, 1));
  
  // Başlangıç tarihi değiştiğinde takvimi güncelle
  useEffect(() => {
    if (startDate) {
      setCalendarMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    }
  }, [startDate, setCalendarMonth]);
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const isDateInRange = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return selectedDates.some(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    );
  };

  const isStartDate = (day: number) => {
    if (!startDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === startDate.toDateString();
  };

  const isEndDate = (day: number) => {
    if (!endDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === endDate.toDateString();
  };

  const isWeekend = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Pazar (0) veya Cumartesi (6)
  };

  const isPublicHoliday = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return TURKISH_HOLIDAYS_2025.some(holiday => 
      holiday.date.getDate() === date.getDate() &&
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
    );
  };

  const getPublicHoliday = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return TURKISH_HOLIDAYS_2025.find(holiday => 
      holiday.date.getDate() === date.getDate() &&
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
    );
  };

  const isApprovedLeave = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return MOCK_APPROVED_LEAVES.some(leave => 
      leave.date.getDate() === date.getDate() &&
      leave.date.getMonth() === date.getMonth() &&
      leave.date.getFullYear() === date.getFullYear()
    );
  };

  const isPendingLeave = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return MOCK_PENDING_LEAVES.some(leave => 
      leave.date.getDate() === date.getDate() &&
      leave.date.getMonth() === date.getMonth() &&
      leave.date.getFullYear() === date.getFullYear()
    );
  };

  const getTooltipText = (day: number): string | null => {
    const holiday = getPublicHoliday(day);
    if (holiday) {
      return language === 'tr' ? holiday.name : holiday.nameEn;
    }
    if (isApprovedLeave(day)) {
      return language === 'tr' ? 'Onaylanmış İzin' : 'Approved Leave';
    }
    if (isPendingLeave(day)) {
      return language === 'tr' ? 'Onay Bekleyen İzin' : 'Pending Leave';
    }
    return null;
  };

  const handleMouseEnter = (day: number, event: React.MouseEvent) => {
    const tooltip = getTooltipText(day);
    if (tooltip) {
      setHoveredDay(day);
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({ 
        x: rect.left + rect.width / 2, 
        y: rect.top - 10 
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #f3f4f6',
    padding: '16px',
  };

  return (
    <>
      <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCalendarMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
          }}
          style={{ 
            padding: '8px', 
            border: 'none', 
            background: 'transparent', 
            cursor: 'pointer', 
            fontSize: '18px',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setYearOpen(true)}
          style={{
            fontWeight: 600,
            color: '#1f2937',
            fontSize: '16px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
          title={language === 'tr' ? 'Yıllık görünümü aç' : 'Open year view'}
        >
          {t.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCalendarMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
          }}
          style={{ 
            padding: '8px', 
            border: 'none', 
            background: 'transparent', 
            cursor: 'pointer', 
            fontSize: '18px',
            borderRadius: '4px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          →
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '12px', marginBottom: '8px' }}>
        {t.days.map(day => (
          <div key={day} style={{ fontWeight: '600', color: '#6b7280', padding: '4px' }}>{day}</div>
        ))}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {emptyDays.map(i => (
          <div key={`empty-${i}`} style={{ aspectRatio: '1' }} />
        ))}
        {days.map(day => {
          const inRange = isDateInRange(day);
          const isStart = isStartDate(day);
          const isEnd = isEndDate(day);
          const weekend = isWeekend(day);
          const publicHoliday = isPublicHoliday(day);
          const approvedLeave = isApprovedLeave(day);
          const pendingLeave = isPendingLeave(day);
          
          // Öncelik sırası: Seçili tarih > Onaylı izin > Onay bekleyen > Resmi tatil > Hafta sonu
          let backgroundColor = 'transparent';
          let textColor = '#374151';
          let fontWeight: React.CSSProperties['fontWeight'] = 'normal';
          let border = 'none';
          let opacity = 1;

          if (isStart || isEnd) {
            backgroundColor = CALENDAR_COLORS.selectedEdge.background;
            textColor = CALENDAR_COLORS.selectedEdge.text;
            fontWeight = 'bold';
            border = `2px solid ${CALENDAR_COLORS.selectedEdge.border}`;
          } else if (inRange) {
            backgroundColor = CALENDAR_COLORS.selectedRange.background;
            textColor = CALENDAR_COLORS.selectedRange.text;
            fontWeight = 'bold';
          } else if (approvedLeave) {
            backgroundColor = CALENDAR_COLORS.approvedLeave.background;
            textColor = CALENDAR_COLORS.approvedLeave.text;
            fontWeight = '600';
            border = `1px solid ${CALENDAR_COLORS.approvedLeave.border}`;
          } else if (pendingLeave) {
            backgroundColor = CALENDAR_COLORS.pendingLeave.background;
            textColor = CALENDAR_COLORS.pendingLeave.text;
            fontWeight = '600';
            border = `1px dashed ${CALENDAR_COLORS.pendingLeave.border}`;
          } else if (publicHoliday) {
            backgroundColor = CALENDAR_COLORS.publicHoliday.background;
            textColor = CALENDAR_COLORS.publicHoliday.text;
            fontWeight = '600';
            border = `1px solid ${CALENDAR_COLORS.publicHoliday.border}`;
          } else if (weekend) {
            backgroundColor = CALENDAR_COLORS.weekend.background;
            textColor = CALENDAR_COLORS.weekend.text;
            fontWeight = '600';
            opacity = 0.7;
          }
          
          const dayStyle: React.CSSProperties = {
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            backgroundColor,
            color: textColor,
            fontWeight,
            border,
            opacity,
            cursor: publicHoliday || approvedLeave || pendingLeave ? 'pointer' : 'default',
            position: 'relative',
          };
          
          const handleClick = () => {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            if (!startDate || (startDate && endDate)) {
              handleDateSelect(date, true);
            } else if (startDate && !endDate) {
              if (date < startDate) {
                handleDateSelect(date, true);
              } else {
                handleDateSelect(date, false);
              }
            }
          };

          return (
            <button 
              key={day} 
              type="button"
              style={{ ...dayStyle, cursor: 'pointer' }}
              onMouseEnter={(e) => handleMouseEnter(day, e)}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend - Renk Paleti */}
      <div style={{ 
        marginTop: '12px', 
        padding: '12px',
        background: '#f9fafb',
        borderRadius: '8px',
        fontSize: '11px',
      }}>
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
          {language === 'tr' ? 'Renk Paleti' : 'Color Legend'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: CALENDAR_COLORS.publicHoliday.background, border: `1px solid ${CALENDAR_COLORS.publicHoliday.border}`, borderRadius: '4px' }} />
            <span style={{ color: '#6b7280' }}>{language === 'tr' ? 'Resmi Tatil' : 'Holiday'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: CALENDAR_COLORS.approvedLeave.background, border: `1px solid ${CALENDAR_COLORS.approvedLeave.border}`, borderRadius: '4px' }} />
            <span style={{ color: '#6b7280' }}>{language === 'tr' ? 'Onaylı İzin' : 'Approved'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: CALENDAR_COLORS.pendingLeave.background, border: `1px dashed ${CALENDAR_COLORS.pendingLeave.border}`, borderRadius: '4px' }} />
            <span style={{ color: '#6b7280' }}>{language === 'tr' ? 'Onay Bekliyor' : 'Pending'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: CALENDAR_COLORS.weekend.background, borderRadius: '4px' }} />
            <span style={{ color: '#6b7280' }}>{language === 'tr' ? 'Hafta Sonu' : 'Weekend'}</span>
          </div>
        </div>
      </div>
    </div>

      {/* Year View Overlay */}
      {yearOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setYearOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              width: 'min(1000px, 96vw)',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={() => setYearBase(new Date(yearBase.getFullYear() - 1, 0, 1))}
                style={{ ...{
                  padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', borderRadius: '6px'
                } as React.CSSProperties }}
              >
                ←
              </button>
              <div style={{ fontWeight: 700, color: '#111827' }}>{yearBase.getFullYear()}</div>
              <button
                type="button"
                onClick={() => setYearBase(new Date(yearBase.getFullYear() + 1, 0, 1))}
                style={{ ...{
                  padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', borderRadius: '6px'
                } as React.CSSProperties }}
              >
                →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))', gap: '12px' }}>
              {Array.from({ length: 12 }, (_, m) => new Date(yearBase.getFullYear(), m, 1)).map((monthDate, idx) => {
                const year = monthDate.getFullYear();
                const month = monthDate.getMonth();
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const daysInMonth = lastDay.getDate();
                const startingDayOfWeek = firstDay.getDay();
                const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
                const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

                return (
                  <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}>
                    <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: '4px', color: '#374151' }}>
                      {t.months[month]} {year}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', textAlign: 'center', fontSize: '11px', marginBottom: '4px', color: '#6b7280' }}>
                      {t.days.map(day => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', textAlign: 'center' }}>
                      {emptyDays.map(i => (
                        <div key={`empty-year-${idx}-${i}`} style={{ aspectRatio: '1' }} />
                      ))}
                      {days.map(day => {
                        const date = new Date(year, month, day);
                        const inRange = selectedDates.some(d => d.toDateString() === date.toDateString());
                        const isStart = startDate && date.toDateString() === startDate.toDateString();
                        const isEnd = endDate && date.toDateString() === endDate.toDateString();
                        let backgroundColor = 'transparent';
                        let color = '#374151';
                        let border = '1px solid #e5e7eb';
                        if (isStart || isEnd) {
                          backgroundColor = '#2563eb';
                          color = 'white';
                          border = '2px solid #1d4ed8';
                        } else if (inRange) {
                          backgroundColor = '#dbeafe';
                          color = '#1f2937';
                          border = '1px solid #bfdbfe';
                        }
                        return (
                          <button
                            key={`y-${idx}-${day}`}
                            type="button"
                            onClick={() => {
                              if (!startDate || (startDate && endDate)) handleDateSelect(date, true);
                              else if (startDate && !endDate) {
                                if (date < startDate) handleDateSelect(date, true);
                                else {
                                  handleDateSelect(date, false);
                                  setYearOpen(false);
                                }
                              }
                            }}
                            style={{
                              aspectRatio: '1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              borderRadius: '6px',
                              backgroundColor,
                              color,
                              border,
                              cursor: 'pointer'
                            }}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {hoveredDay !== null && getTooltipText(hoveredDay) && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {getTooltipText(hoveredDay)}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #1f2937',
            }}
          />
        </div>
      )}
    </>
  );
};
