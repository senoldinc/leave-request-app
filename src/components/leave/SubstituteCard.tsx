import React from 'react';
import { User } from 'lucide-react';
import { Translations, Employee } from '../../types';

interface SubstituteCardProps {
  substitute: string;
  onSubstituteChange: (id: string) => void;
  employees: Employee[];
  t: Translations;
}

const isMobile = window.innerWidth < 768;

export const SubstituteCard: React.FC<SubstituteCardProps> = ({
  substitute,
  onSubstituteChange,
  employees,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <User color="#22c55e" size={24} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{t.substitute.title}</h2>
      </div>
      
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          {t.substitute.title}
        </label>
        <select
          value={substitute}
          onChange={(e) => onSubstituteChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            transition: 'all 0.2s',
            backgroundColor: 'white',
          }}
          required
        >
          <option value="">{t.substitute.selectSubstitute}</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.id}>
              {employee.name} - {employee.department}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
