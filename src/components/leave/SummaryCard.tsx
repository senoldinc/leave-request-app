import React from 'react';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { Translations, Employee } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface SummaryCardProps {
  startDate: Date | null;
  endDate: Date | null;
  leaveType: string;
  substitute: string;
  businessDays: number;
  employees: Employee[];
  isFormValid: boolean;
  t: Translations;
  language: 'tr' | 'en';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  startDate,
  endDate,
  leaveType,
  substitute,
  businessDays,
  employees,
  isFormValid,
  t,
  language,
}) => {
  const summaryStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
    borderRadius: '16px',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    padding: '24px',
    color: 'white',
  };

  return (
    <div style={summaryStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>{t.summary.title}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Calendar size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '14px' }}>
            <div style={{ fontWeight: '600' }}>{t.summary.dateRange}</div>
            <div style={{ opacity: 0.9 }}>
              {startDate && endDate
                ? `${formatDate(startDate, language)} - ${formatDate(endDate, language)}`
                : t.summary.notSelectedYet}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <MessageSquare size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '14px' }}>
            <div style={{ fontWeight: '600' }}>{t.summary.leaveType}</div>
            <div style={{ opacity: 0.9 }}>
              {leaveType 
                ? t.leaveTypes[leaveType as keyof typeof t.leaveTypes]
                : t.summary.notSelectedYet}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <User size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
          <div style={{ fontSize: '14px' }}>
            <div style={{ fontWeight: '600' }}>{t.summary.substitute}</div>
            <div style={{ opacity: 0.9 }}>
              {substitute 
                ? employees.find(e => e.id === substitute)?.name
                : t.summary.notSelectedYet}
            </div>
          </div>
        </div>

        {startDate && endDate && (
          <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{businessDays}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>{t.summary.businessDays}</div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        style={{
          width: '100%',
          marginTop: '24px',
          padding: '12px 24px',
          background: 'white',
          color: '#2563eb',
          borderRadius: '8px',
          fontWeight: 'bold',
          border: 'none',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          fontSize: '16px',
          opacity: isFormValid ? 1 : 0.5,
          transition: 'all 0.2s',
        }}
      >
        {t.buttons.submit}
      </button>
    </div>
  );
};
