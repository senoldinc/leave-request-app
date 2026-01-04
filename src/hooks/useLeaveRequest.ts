import { useState } from 'react';
import { LeaveRequest } from '../types';
import { generateSelectedDates } from '../utils/dateUtils';

export const useLeaveRequest = () => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest>({
    startDate: null,
    endDate: null,
    leaveType: '',
    substitute: '',
    description: '',
    outOfOfficeEnabled: false,
    outOfOfficeMessage: '',
    attachedFiles: [],
  });

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateSelect = (date: Date, isStart: boolean) => {
    if (isStart) {
      setLeaveRequest(prev => ({ ...prev, startDate: date, endDate: null }));
      setSelectedDates([]);
    } else if (leaveRequest.startDate) {
      setLeaveRequest(prev => ({ ...prev, endDate: date }));
      setSelectedDates(generateSelectedDates(leaveRequest.startDate, date));
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
    setLeaveRequest({
      startDate: null,
      endDate: null,
      leaveType: '',
      substitute: '',
      description: '',
      outOfOfficeEnabled: false,
      outOfOfficeMessage: '',
      attachedFiles: [],
    });
    setSelectedDates([]);
  };

  return {
    leaveRequest,
    setLeaveRequest,
    selectedDates,
    handleDateSelect,
    handleFileUpload,
    handleRemoveFile,
    resetLeaveRequest,
  };
};
