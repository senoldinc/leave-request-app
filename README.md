# 🏖️ Çalışan İzin Talep Yönetim Sistemi

Modern ve profesyonel bir React TypeScript uygulaması ile çalışanların izin taleplerini yönetmek için kapsamlı bir çözüm.

## 📁 Proje Yapısı

```
src/
├── components/           # Yeniden kullanılabilir UI bileşenleri
│   ├── common/          # Genel bileşenler
│   │   ├── LanguageSwitcher.tsx
│   │   └── SuccessModal.tsx
│   └── leave/           # İzin formu bileşenleri
│       ├── AutoReplyCard.tsx
│       ├── DateSelectionCard.tsx
│       ├── LeaveDetailsCard.tsx
│       ├── MiniCalendar.tsx
│       ├── SubstituteCard.tsx
│       └── SummaryCard.tsx
├── contexts/            # 🆕 Context API (Global State)
│   ├── LanguageContext.tsx
│   ├── LeaveRequestContext.tsx
│   ├── UIContext.tsx
│   └── index.ts
├── providers/           # 🆕 Context Provider Wrapper
│   └── AppProviders.tsx
├── constants/           # Sabit değerler
│   ├── employees.ts
│   └── leaveTypes.ts
├── hooks/              # Custom React hooks
│   └── useLeaveRequest.ts
├── pages/              # Sayfa bileşenleri
│   └── LeaveRequestPage.tsx
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── utils/              # Yardımcı fonksiyonlar
│   ├── dateUtils.ts
│   └── fileUtils.ts
├── translations.ts     # Çoklu dil desteği
├── App.tsx            # Ana uygulama
└── index.tsx          # Giriş noktası
```

## ✨ Özellikler

### 🔄 Global State Yönetimi (YENI!)
- **Context API** ile merkezi state yönetimi
- **3 Ayrı Context:**
  - `LanguageContext`: Dil yönetimi
  - `LeaveRequestContext`: İzin talebi state
  - `UIContext`: Modal ve loading durumları
- Prop drilling probleminin çözümü
- Type-safe API'ler
- Kolay test edilebilir yapı

### 🌐 Çoklu Dil Desteği
- **Türkçe (TR)** ve **İngilizce (EN)** dil seçenekleri
- Tek tıkla dil değiştirme
- Tüm UI elementleri ve tarih formatları otomatik güncellenir
- Context API ile global dil yönetimi

### 📅 Gelişmiş Tarih Seçimi
- Başlangıç ve bitiş tarihi seçimi
- **Mini takvim görünümü** ile seçilen tarihlerin görsel gösterimi
- Otomatik **iş günü hesaplama** (hafta sonları hariç)
- Tarih aralığı özeti

### 📎 Dosya Yükleme Sistemi
- Belirli izin türleri için **zorunlu dosya yükleme**
  - Hastalık İzni
  - Mazeret İzni
  - Ücretsiz İzin
- **Çoklu dosya desteği**
- Desteklenen formatlar: PDF, DOC, DOCX, JPG, JPEG, PNG
- Dosya boyutu gösterimi
- Her dosyayı ayrı ayrı kaldırma özelliği

### 👥 Vekil Yönetimi
- Dropdown menüden vekil çalışan seçimi
- Çalışan ismi ve departman bilgisi
- Kolayca özelleştirilebilir çalışan listesi

### 🔔 Otomatik Yanıt (Out of Office)
- Modern **switch butonu** ile aktifleştirme
- Özelleştirilebilir otomatik yanıt mesajı
- İzin süresince e-postalara otomatik yanıt

### 📊 Akıllı Özet Paneli
- Tüm izin detaylarının özetlenmiş görünümü
- Gerçek zamanlı form validasyonu
- Sticky tasarım (scroll sırasında sabit)
- Büyük, görsel iş günü sayacı

### 📱 Responsive Tasarım
- **Mobil uyumlu** (< 768px)
- **Tablet optimize** (< 1024px)
- **Desktop** için geniş ekran desteği
- Touch-friendly buton ve input boyutları

### 🎨 Modern UI/UX
- Gradyan arka planlar
- Smooth animasyonlar ve geçişler
- Kart tabanlı tasarım
- Renkli ikon sistemi
- Shadow ve hover efektleri

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Kurulum Adımları

```bash
# Projeyi klonlayın veya indirin
cd mydemo

# Bağımlılıkları yükleyin
npm install

# Development sunucusunu başlatın
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

### Production Build

```bash
npm run build
```

## 🏗️ Mimari ve Tasarım Desenleri

### Component-Based Architecture
- **Atomik tasarım prensibi** ile küçük, yeniden kullanılabilir bileşenler
- Her bileşen tek bir sorumluluğa sahip (Single Responsibility Principle)
- Props ile kolay özelleştirme

### Context API Pattern (YENI!)
- **Global State Management** - Prop drilling'den kurtulma
- **Provider Pattern** - Merkezi state yönetimi
- **Custom Hooks** - Context'lere kolay erişim
- **Type Safety** - TypeScript ile güvenli API'ler

```tsx
// Context kullanım örneği
function MyComponent() {
  const { language, t } = useLanguage();
  const { leaveRequest, handleDateSelect } = useLeaveRequestContext();
  const { openSuccessModal } = useUI();
  
  return <div>{t.pageTitle}</div>;
}
```

### Custom Hooks
- `useLanguage`: Dil yönetimi context hook
- `useLeaveRequestContext`: İzin talebi state hook
- `useUI`: UI durumları hook

### Utility Functions
- `dateUtils`: Tarih hesaplamaları ve formatlama
- `fileUtils`: Dosya boyutu formatlama

### Type Safety
- Tüm bileşenler için TypeScript interface'leri
- Props ve state için strict typing
- Compile-time hata kontrolü

## 🔧 Özelleştirme

### Yeni İzin Türü Ekleme

```typescript
// src/constants/leaveTypes.ts
export const LEAVE_TYPES: LeaveType[] = [
  // ... mevcut türler
  { value: 'custom', requiresAttachment: true },
];

// src/translations.ts
leaveTypes: {
  // ... mevcut türler
  custom: 'Özel İzin',
}
```

### Yeni Çalışan Ekleme

```typescript
// src/constants/employees.ts
export const MOCK_EMPLOYEES: Employee[] = [
  // ... mevcut çalışanlar
  { id: '6', name: 'Yeni Çalışan', department: 'Departman' },
];
```

### Yeni Dil Ekleme

```typescript
// src/translations.ts
export const translations = {
  tr: { /* ... */ },
  en: { /* ... */ },
  de: { /* Almanca çeviriler */ },
};
```

### Yeni Context Ekleme

Detaylı bilgi için `CONTEXT_API_GUIDE.md` dosyasına bakın.

```tsx
// 1. Context oluştur
export const NewContext = createContext<NewContextType | undefined>(undefined);

// 2. Provider oluştur
export const NewProvider: React.FC<Props> = ({ children }) => { ... }

// 3. Custom hook oluştur
export const useNew = () => { ... }

// 4. AppProviders'a ekle
<NewProvider>
  {children}
</NewProvider>
```

## 📦 Kullanılan Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Context API** - Global state management
- **Lucide React** - İkon kütüphanesi
- **Create React App** - Build tooling

## 🎯 Best Practices

✅ **TypeScript** ile tip güvenliği  
✅ **Component-based** mimari  
✅ **Context API** ile global state  
✅ **Custom hooks** ile logic ayrımı  
✅ **Utility functions** ile kod tekrarını önleme  
✅ **Constants** klasörü ile configuration yönetimi  
✅ **Responsive design** için inline styles  
✅ **Accessibility** için semantic HTML  
✅ **Clean code** prensipleri  

## 📚 Dokümantasyon

- **README.md** (bu dosya) - Genel proje dokümantasyonu
- **CONTEXT_API_GUIDE.md** - Context API detaylı kullanım kılavuzu

## 🆚 Context API vs Redux

Bu projede **Context API** tercih edildi çünkü:

| Özellik | Context API | Redux |
|---------|-------------|-------|
| Kurulum Kolaylığı | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Öğrenme Eğrisi | Düşük | Yüksek |
| Boilerplate | Az | Çok |
| DevTools | Sınırlı | Gelişmiş |
| Bu Proje İçin | ✅ İdeal | ❌ Aşırı |

**Küçük-orta ölçekli projeler için Context API yeterlidir!**

## 🧪 Testing (Gelecek Özellik)

Context'leri test etmek için:

```tsx
const wrapper = ({ children }) => (
  <AppProviders>
    {children}
  </AppProviders>
);

render(<MyComponent />, { wrapper });
```

## 📝 Lisans

MIT

## 👨‍💻 Geliştirici Notları

- Tüm bileşenler fonksiyonel component olarak yazılmıştır
- State yönetimi için React Context API kullanılmıştır
- Inline styles kullanılarak Tailwind CSS bağımlılığı kaldırılmıştır
- Form validasyonu client-side olarak gerçekleştirilir
- API entegrasyonu için gerekli yapı hazırdır

## 🚀 Gelecek Planlar

- [ ] Unit ve integration testleri
- [ ] Storybook entegrasyonu
- [ ] Dark mode desteği
- [ ] Backend API entegrasyonu
- [ ] PWA özellikleri
- [ ] Redux DevTools benzeri context debugger

---

**Not:** Bu proje bir demo uygulamadır. Production kullanımı için backend API entegrasyonu, authentication, ve database bağlantısı eklenmelidir.

## 🎉 Yeni Özellikler (v2.0)

### ✨ Context API Entegrasyonu
- Global state yönetimi için Context API eklendi
- 3 ayrı context ile modüler yapı
- Prop drilling problemi çözüldü
- Type-safe API'ler

### 📖 Kapsamlı Dokümantasyon
- Context API kullanım kılavuzu eklendi
- Best practices ve örnekler
- Performans ipuçları
- Testing stratejileri

### 🏗️ Geliştirilmiş Mimari
- Provider pattern ile merkezi yönetim
- Custom hooks ile kolay kullanım
- Temiz ve bakımı kolay kod yapısı
