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

export const translations: { tr: Translations; en: Translations } = {
  tr: {
    pageTitle: 'İzin Talep Formu',
    pageSubtitle: 'İzin talebinizi oluşturmak için formu doldurun',
    dates: {
      title: 'İzin Tarihleri',
      startDate: 'Başlangıç Tarihi',
      endDate: 'Bitiş Tarihi',
      businessDays: 'iş günü',
    },
    leaveDetails: {
      title: 'İzin Detayları',
      leaveType: 'İzin Türü',
      selectLeaveType: 'İzin türü seçin...',
      description: 'Açıklama',
      descriptionPlaceholder: 'Lütfen izin sebebinizi açıklayın...',
      attachFile: 'Dosya Ekle',
      uploadFile: 'Dosya Yükle',
      filesAttached: 'dosya eklendi',
    },
    substitute: {
      title: 'Vekil Seçimi',
      selectSubstitute: 'Vekil seçin...',
    },
    autoReply: {
      title: 'Otomatik Yanıt',
      message: 'Otomatik Yanıt Mesajı',
      messagePlaceholder: 'Örnek: Merhaba, şu anda izindeyim ve [bitiş tarihi] tarihinde dönüş yapacağım. Acil durumlar için [vekil ismi] ile iletişime geçebilirsiniz.',
      hint: 'Bu mesaj, izininiz boyunca size gelen e-postalara otomatik olarak gönderilecektir.',
    },
    summary: {
      title: 'Talep Özeti',
      dateRange: 'Tarih Aralığı',
      leaveType: 'İzin Türü',
      substitute: 'Vekil',
      notSelectedYet: 'Henüz seçilmedi',
      businessDays: 'İş Günü',
    },
    leaveBalance: {
      title: 'İzin Bakiyesi',
      total: 'Toplam İzin Hakkı',
      used: 'Kullanılan',
      remaining: 'Kalan',
      carriedOver: 'Devreden',
      carriedOverDate: 'Devir Tarihi',
      nextAccrual: 'Sonraki Hak Ediş',
      nextAccrualDate: 'Hak Ediş Tarihi',
      willAccrue: 'Eklenecek',
      days: 'gün',
    },
    leaveTypes: {
      annual: 'Yıllık İzin',
      sick: 'Hastalık İzni',
      personal: 'Mazeret İzni',
      maternity: 'Doğum İzni',
      paternity: 'Babalık İzni',
      unpaid: 'Ücretsiz İzin',
    },
    buttons: {
      submit: 'İzin Talebini Gönder',
      ok: 'Tamam',
      remove: 'Kaldır',
    },
    success: {
      title: 'Talebiniz Alındı!',
      message: 'İzin talebiniz başarıyla oluşturuldu ve onay için yöneticinize iletildi.',
    },
    months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    days: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  },
  en: {
    pageTitle: 'Leave Request Form',
    pageSubtitle: 'Fill out the form to create your leave request',
    dates: {
      title: 'Leave Dates',
      startDate: 'Start Date',
      endDate: 'End Date',
      businessDays: 'business days',
    },
    leaveDetails: {
      title: 'Leave Details',
      leaveType: 'Leave Type',
      selectLeaveType: 'Select leave type...',
      description: 'Description',
      descriptionPlaceholder: 'Please explain the reason for your leave...',
      attachFile: 'Attach File',
      uploadFile: 'Upload File',
      filesAttached: 'files attached',
    },
    substitute: {
      title: 'Substitute Selection',
      selectSubstitute: 'Select substitute...',
    },
    autoReply: {
      title: 'Auto Reply',
      message: 'Auto Reply Message',
      messagePlaceholder: 'Example: Hello, I am currently on leave and will return on [end date]. For urgent matters, please contact [substitute name].',
      hint: 'This message will be automatically sent to emails received during your leave.',
    },
    summary: {
      title: 'Request Summary',
      dateRange: 'Date Range',
      leaveType: 'Leave Type',
      substitute: 'Substitute',
      notSelectedYet: 'Not selected yet',
      businessDays: 'Business Days',
    },
    leaveBalance: {
      title: 'Leave Balance',
      total: 'Total Entitlement',
      used: 'Used',
      remaining: 'Remaining',
      carriedOver: 'Carried Over',
      carriedOverDate: 'Carry Over Date',
      nextAccrual: 'Next Accrual',
      nextAccrualDate: 'Accrual Date',
      willAccrue: 'Will Accrue',
      days: 'days',
    },
    leaveTypes: {
      annual: 'Annual Leave',
      sick: 'Sick Leave',
      personal: 'Personal Leave',
      maternity: 'Maternity Leave',
      paternity: 'Paternity Leave',
      unpaid: 'Unpaid Leave',
    },
    buttons: {
      submit: 'Submit Leave Request',
      ok: 'OK',
      remove: 'Remove',
    },
    success: {
      title: 'Request Received!',
      message: 'Your leave request has been successfully created and sent to your manager for approval.',
    },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
};
