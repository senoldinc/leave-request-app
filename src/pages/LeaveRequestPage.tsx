import React from 'react';
import { LEAVE_TYPES } from '../constants/leaveTypes';
import { MOCK_EMPLOYEES } from '../constants/employees';
import { MOCK_LEAVE_BALANCE } from '../constants/leaveBalance';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeaveRequestContext } from '../contexts/LeaveRequestContext';
import { useUI } from '../contexts/UIContext';
import { calculateBusinessDays } from '../utils/dateUtils';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { SuccessModal } from '../components/common/SuccessModal';
import { DateSelectionCard } from '../components/leave/DateSelectionCard';
import { LeaveDetailsCard } from '../components/leave/LeaveDetailsCard';
import { SubstituteCard } from '../components/leave/SubstituteCard';
import { AutoReplyCard } from '../components/leave/AutoReplyCard';
import { MiniCalendar } from '../components/leave/MiniCalendar';
import { SummaryCard } from '../components/leave/SummaryCard';
import { LeaveBalanceCard } from '../components/leave/LeaveBalanceCard';

const isMobile = window.innerWidth < 768;
const isTablet = window.innerWidth < 1024;

export const LeaveRequestPage: React.FC = () => {
  // Context hooks
  const { language, setLanguage, t } = useLanguage();
  const {
    leaveRequest,
    setLeaveRequest,
    selectedDates,
    handleDateSelect,
    handleFileUpload,
    handleRemoveFile,
    resetLeaveRequest,
  } = useLeaveRequestContext();
  const { showSuccessModal, openSuccessModal, closeSuccessModal } = useUI();

  const currentLeaveType = LEAVE_TYPES.find(lt => lt.value === leaveRequest.leaveType);
  const businessDays = calculateBusinessDays(leaveRequest.startDate, leaveRequest.endDate);

  const isFormValid = (): boolean => {
    return !!(
      leaveRequest.startDate &&
      leaveRequest.endDate &&
      leaveRequest.leaveType &&
      leaveRequest.substitute &&
      (!currentLeaveType?.requiresAttachment || leaveRequest.attachedFiles.length > 0) &&
      (!leaveRequest.outOfOfficeEnabled || leaveRequest.outOfOfficeMessage.trim() !== '')
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('İzin talebi gönderildi:', leaveRequest);
    openSuccessModal();
  };

  const handleModalClose = () => {
    closeSuccessModal();
    resetLeaveRequest();
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #f3e8ff 100%)',
    padding: isMobile ? '16px 8px' : '32px 16px',
  };

  const maxWidthStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '0 8px' : '0',
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '32px',
  };

  const titleStyle = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        <LanguageSwitcher />

        <div style={headerStyle}>
          <h1 style={titleStyle}>{t.pageTitle}</h1>
          <p style={{ color: '#6b7280' }}>{t.pageSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr', gap: '24px' }}>
            {/* Left Column */}
            <div>
              {/* İzin Bakiyesi - En üstte */}
              <LeaveBalanceCard balance={MOCK_LEAVE_BALANCE} />

              <DateSelectionCard
                startDate={leaveRequest.startDate}
                endDate={leaveRequest.endDate}
                onDateSelect={handleDateSelect}
                businessDays={businessDays}
                t={t}
                language={language}
              />

              <LeaveDetailsCard
                leaveType={leaveRequest.leaveType}
                attachedFiles={leaveRequest.attachedFiles}
                onLeaveTypeChange={(type) => setLeaveRequest(prev => ({ ...prev, leaveType: type, attachedFiles: [] }))}
                onFileUpload={handleFileUpload}
                onRemoveFile={handleRemoveFile}
                leaveTypes={LEAVE_TYPES}
                currentLeaveType={currentLeaveType}
                t={t}
              />

              <SubstituteCard
                substitute={leaveRequest.substitute}
                onSubstituteChange={(id) => setLeaveRequest(prev => ({ ...prev, substitute: id }))}
                employees={MOCK_EMPLOYEES}
                t={t}
              />

              <AutoReplyCard
                enabled={leaveRequest.outOfOfficeEnabled}
                message={leaveRequest.outOfOfficeMessage}
                onToggle={(enabled) => setLeaveRequest(prev => ({ 
                  ...prev, 
                  outOfOfficeEnabled: enabled,
                  outOfOfficeMessage: enabled ? prev.outOfOfficeMessage : ''
                }))}
                onMessageChange={(message) => setLeaveRequest(prev => ({ ...prev, outOfOfficeMessage: message }))}
                t={t}
              />
            </div>

            {/* Right Column */}
            <div>
              <MiniCalendar
                selectedDates={selectedDates}
                startDate={leaveRequest.startDate}
                endDate={leaveRequest.endDate}
                t={t}
              />
              
              <div style={{ marginTop: '24px' }}>
                <SummaryCard
                  startDate={leaveRequest.startDate}
                  endDate={leaveRequest.endDate}
                  leaveType={leaveRequest.leaveType}
                  substitute={leaveRequest.substitute}
                  businessDays={businessDays}
                  employees={MOCK_EMPLOYEES}
                  isFormValid={isFormValid()}
                  t={t}
                  language={language}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <SuccessModal
        show={showSuccessModal}
        onClose={handleModalClose}
      />
    </div>
  );
};
