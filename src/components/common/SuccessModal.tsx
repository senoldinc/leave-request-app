import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
  const { t } = useLanguage();
  
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px',
    }}>
      <div className="animate-fadeIn" style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        padding: '32px',
        maxWidth: '448px',
        width: '100%',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <CheckCircle color="#22c55e" size={32} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            {t.success.title}
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            {t.success.message}
          </p>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {t.buttons.ok}
          </button>
        </div>
      </div>
    </div>
  );
};
