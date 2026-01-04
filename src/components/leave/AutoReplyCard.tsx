import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Translations } from '../../types';

interface AutoReplyCardProps {
  enabled: boolean;
  message: string;
  onToggle: (enabled: boolean) => void;
  onMessageChange: (message: string) => void;
  t: Translations;
}

const isMobile = window.innerWidth < 768;

export const AutoReplyCard: React.FC<AutoReplyCardProps> = ({
  enabled,
  message,
  onToggle,
  onMessageChange,
  t,
}) => {
  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    padding: isMobile ? '16px' : '24px',
    border: '1px solid #f3f4f6',
    marginBottom: isMobile ? '16px' : '24px',
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare color="#f97316" size={24} />
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{t.autoReply.title}</h2>
        </div>
        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          />
          <div style={{
            width: '56px',
            height: '28px',
            backgroundColor: enabled ? '#3b82f6' : '#d1d5db',
            borderRadius: '14px',
            position: 'relative',
            transition: 'background-color 0.2s',
          }}>
            <div style={{
              position: 'absolute',
              top: '2px',
              left: enabled ? '30px' : '2px',
              width: '24px',
              height: '24px',
              backgroundColor: 'white',
              borderRadius: '50%',
              transition: 'left 0.2s',
            }} />
          </div>
        </label>
      </div>

      {enabled && (
        <div className="animate-fadeIn">
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            {t.autoReply.message}
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder={t.autoReply.messagePlaceholder}
            rows={5}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'all 0.2s',
              resize: 'none',
              fontFamily: 'inherit',
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
            {t.autoReply.hint}
          </p>
        </div>
      )}
    </div>
  );
};
