import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LeaveRequest } from '../types';
import { generateSelectedDates } from '../utils/dateUtils';

interface LeaveRequestContextType {
  leaveRequest: LeaveRequest;
  selectedDates: Date[];
  calendarMonth: Date;
  setLeaveRequest: React.Dispatch<React.SetStateAction<LeaveRequest>>;
  setCalendarMonth: React.Dispatch<React.SetStateAction<Date>>;
  handleDateSelect: (date: Date, isStart: boolean) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  resetLeaveRequest: () => void;
}

const LeaveRequestContext = createContext<LeaveRequestContextType | undefined>(undefined);

interface LeaveRequestProviderProps {
  children: ReactNode;
}

const initialLeaveRequest: LeaveRequest = {
  startDate: null,
  endDate: null,
  leaveType: '',
  substitute: '',
  description: '',
  outOfOfficeEnabled: false,
  outOfOfficeMessage: '',
  attachedFiles: [],
};

export const LeaveRequestProvider: React.FC<LeaveRequestProviderProps> = ({ children }) => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>(initialLeaveRequest);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const handleDateSelect = (date: Date, isStart: boolean) => {
    if (isStart) {
      setLeaveRequest(prev => ({ ...prev, startDate: date, endDate: null }));
      setSelectedDates([]);
      // Takvimi seçilen tarihin ayına ayarla
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else if (leaveRequest.startDate) {
      setLeaveRequest(prev => ({ ...prev, endDate: date }));
      setSelectedDates(generateSelectedDates(leaveRequest.startDate, date));
      // Bitiş tarihi seçilince takvimi güncelle
      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setLeaveRequest(prev => ({
        ...prev,
        attachedFiles: [...prev.attachedFiles, ...newFiles]
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setLeaveRequest(prev => ({
      ...prev,
      attachedFiles: prev.attachedFiles.filter((_, i) => i !== index)
    }));
  };

  const resetLeaveRequest = () => {
    setLeaveRequest(initialLeaveRequest);
    setSelectedDates([]);
    setCalendarMonth(new Date());
  };

  const value: LeaveRequestContextType = {
    leaveRequest,
    selectedDates,
    calendarMonth,
    setLeaveRequest,
    setCalendarMonth,
    handleDateSelect,
    handleFileUpload,
    handleRemoveFile,
    resetLeaveRequest,
  };

  return (
    <LeaveRequestContext.Provider value={value}>
      {children}
    </LeaveRequestContext.Provider>
  );
};

export const useLeaveRequestContext = (): LeaveRequestContextType => {
  const context = useContext(LeaveRequestContext);
  if (!context) {
    throw new Error('useLeaveRequestContext must be used within a LeaveRequestProvider');
  }
  return context;
};
