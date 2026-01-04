import { LeaveType } from '../types';

export const LEAVE_TYPES: LeaveType[] = [
  { value: 'annual', requiresAttachment: false },
  { value: 'sick', requiresAttachment: true },
  { value: 'personal', requiresAttachment: true },
  { value: 'maternity', requiresAttachment: false },
  { value: 'paternity', requiresAttachment: false },
  { value: 'unpaid', requiresAttachment: true },
];
