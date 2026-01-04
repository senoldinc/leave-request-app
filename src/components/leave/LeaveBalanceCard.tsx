import React, { useState } from 'react';
import { Calendar, TrendingUp, RotateCcw, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { LeaveBalance } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
}

const isMobile = window.innerWidth < 768;

export const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ balance }) => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    padding: isMobile ? '16px' : '24px',
    border: '1px solid #f3f4f6',
    marginBottom: isMobile ? '16px' : '24px',
  };

  const progressBarStyle = (percentage: number, color: string) => ({
    width: '100%',
    height: '8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    overflow: 'hidden' as const,
    position: 'relative' as const,
  });

  const progressFillStyle = (percentage: number, color: string) => ({
    height: '100%',
    width: `${percentage}%`,
    background: color,
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  });

  const usedPercentage = (balance.usedDays / balance.totalDays) * 100;
  const remainingPercentage = (balance.remainingDays / balance.totalDays) * 100;

  return (
    <div style={cardStyle}>
      {/* Header - Her zaman görünür */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
          padding: '4px',
          margin: '-4px',
          borderRadius: '8px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <Award color="#10b981" size={22} />
          <h2 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
            {t.leaveBalance.title}
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
          <span>{t.leaveBalance.remaining}:</span>
          <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '24px', lineHeight: '1' }}>
            {balance.remainingDays}
          </span>
          <span style={{ color: '#9ca3af' }}>{t.leaveBalance.days}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280' }}>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Detaylar - Sadece expanded olduğunda göster */}
      {isExpanded && (
        <div style={{ marginTop: '20px' }}>
          {/* Kalan İzin - Büyük Gösterge */}
          <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
          {t.leaveBalance.remaining}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: '1' }}>
          {balance.remainingDays}
        </div>
        <div style={{ fontSize: '16px', opacity: 0.9, marginTop: '4px' }}>
          {t.leaveBalance.days}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
          <span style={{ color: '#6b7280' }}>
            {t.leaveBalance.used}: {balance.usedDays}/{balance.totalDays}
          </span>
          <span style={{ color: '#10b981', fontWeight: '600' }}>
            {remainingPercentage.toFixed(0)}% {t.leaveBalance.remaining.toLowerCase()}
          </span>
        </div>
        <div style={progressBarStyle(100, '')}>
          <div style={progressFillStyle(usedPercentage, 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)')} />
        </div>
      </div>

      {/* Detaylar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Toplam İzin Hakkı */}
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Calendar size={20} color="#3b82f6" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '2px' }}>
              {t.leaveBalance.total}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
              {balance.totalDays} {t.leaveBalance.days}
            </div>
          </div>
        </div>

        {/* Devreden İzin */}
        {balance.carriedOverDays > 0 && (
          <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <RotateCcw size={20} color="#f59e0b" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '2px' }}>
                {t.leaveBalance.carriedOver}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                {balance.carriedOverDays} {t.leaveBalance.days}
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                {t.leaveBalance.carriedOverDate}: {formatDate(balance.carriedOverDate)}
              </div>
            </div>
          </div>
        )}

        {/* Sonraki Hak Ediş */}
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            gap: '12px',
            padding: '12px',
            background: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#dcfce7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <TrendingUp size={20} color="#22c55e" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#15803d', marginBottom: '2px', fontWeight: '600' }}>
              {t.leaveBalance.nextAccrual}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#166534' }}>
              +{balance.nextAccrualDays} {t.leaveBalance.days}
            </div>
            <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
              {t.leaveBalance.nextAccrualDate}: {formatDate(balance.nextAccrualDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Bilgi Notu */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          background: '#f9fafb',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.5',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '4px', color: '#374151' }}>
          💡 {language === 'tr' ? 'Bilgi' : 'Info'}
        </div>
        {language === 'tr'
          ? 'İzin hak edişleriniz çalışma sürenize göre otomatik olarak hesaplanır. Kullanılmayan izinler yıl sonunda belirlenen kurallara göre devreder.'
          : 'Your leave entitlements are automatically calculated based on your tenure. Unused leave will be carried over at year-end according to company policy.'}
      </div>
        </div>
      )}
    </div>
  );
};
