import React from 'react';
import { MessageSquare, Upload, X } from 'lucide-react';
import { Translations, LeaveType } from '../../types';
import { formatFileSize } from '../../utils/fileUtils';

interface LeaveDetailsCardProps {
  leaveType: string;
  attachedFiles: File[];
  onLeaveTypeChange: (type: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  leaveTypes: LeaveType[];
  currentLeaveType?: LeaveType;
  t: Translations;
}

const isMobile = window.innerWidth < 768;

export const LeaveDetailsCard: React.FC<LeaveDetailsCardProps> = ({
  leaveType,
  attachedFiles,
  onLeaveTypeChange,
  onFileUpload,
  onRemoveFile,
  leaveTypes,
  currentLeaveType,
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
        <MessageSquare color="#a855f7" size={24} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{t.leaveDetails.title}</h2>
      </div>
      
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
          {t.leaveDetails.leaveType}
        </label>
        <select
          value={leaveType}
          onChange={(e) => onLeaveTypeChange(e.target.value)}
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
          <option value="">{t.leaveDetails.selectLeaveType}</option>
          {leaveTypes.map(type => (
            <option key={type.value} value={type.value}>
              {t.leaveTypes[type.value as keyof typeof t.leaveTypes]}
            </option>
          ))}
        </select>
      </div>

      {currentLeaveType?.requiresAttachment && (
        <div className="animate-fadeIn" style={{ marginTop: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
            {t.leaveDetails.attachFile} <span style={{ color: '#ef4444' }}>*</span>
          </label>
          
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={onFileUpload}
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          
          <label
            htmlFor="file-upload"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              border: '2px dashed #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: '#f9fafb',
            }}
          >
            <Upload size={20} color="#6b7280" />
            <span style={{ color: '#6b7280', fontSize: '14px' }}>{t.leaveDetails.uploadFile}</span>
          </label>

          {attachedFiles.length > 0 && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: '600', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    style={{
                      padding: '4px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
