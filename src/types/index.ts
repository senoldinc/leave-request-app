export interface LeaveRequest {
  startDate: Date | null;
  endDate: Date | null;
  leaveType: string;
  substitute: string;
  description: string;
  outOfOfficeEnabled: boolean;
  outOfOfficeMessage: string;
  attachedFiles: File[];
}

export interface Employee {
  id: string;
  name: string;
  department: string;
}

export interface LeaveBalance {
  totalDays: number;           // Toplam hak edilen izin
  usedDays: number;            // Kullanılan izin
  remainingDays: number;       // Kalan izin
  carriedOverDays: number;     // Devreden izin
  carriedOverDate: Date;       // Devir tarihi
  nextAccrualDate: Date;       // Bir sonraki hak ediş tarihi
  nextAccrualDays: number;     // Hak edilecek gün sayısı
}

export type Language = 'tr' | 'en';

export interface LeaveType {
  value: string;
  requiresAttachment: boolean;
}

export interface Translations {
  pageTitle: string;
  pageSubtitle: string;
  dates: {
    title: string;
    startDate: string;
    endDate: string;
    businessDays: string;
  };
  leaveDetails: {
    title: string;
    leaveType: string;
    selectLeaveType: string;
    description: string;
    descriptionPlaceholder: string;
    attachFile: string;
    uploadFile: string;
    filesAttached: string;
  };
  substitute: {
    title: string;
    selectSubstitute: string;
  };
  autoReply: {
    title: string;
    message: string;
    messagePlaceholder: string;
    hint: string;
  };
  summary: {
    title: string;
    dateRange: string;
    leaveType: string;
    substitute: string;
    notSelectedYet: string;
    businessDays: string;
  };
  leaveBalance: {
    title: string;
    total: string;
    used: string;
    remaining: string;
    carriedOver: string;
    carriedOverDate: string;
    nextAccrual: string;
    nextAccrualDate: string;
    willAccrue: string;
    days: string;
  };
  leaveTypes: {
    annual: string;
    sick: string;
    personal: string;
    maternity: string;
    paternity: string;
    unpaid: string;
  };
  buttons: {
    submit: string;
    ok: string;
    remove: string;
  };
  success: {
    title: string;
    message: string;
  };
  months: string[];
  days: string[];
}
