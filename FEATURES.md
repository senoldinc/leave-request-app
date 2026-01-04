# 🎯 Özellik Detayları

## 📅 Takvim Özellikleri

### Hafta Sonu Gösterimi (v2.2.0)

Takvimde hafta sonları görsel olarak ayırt edilir ve kullanıcı dostu gösterilir.

#### Renk Şeması
```css
/* Hafta İçi Günler */
background: transparent
color: #374151 (gray)
font-weight: normal

/* Hafta Sonu Günler */
background: #fef2f2 (light red)
color: #dc2626 (red)
font-weight: 600 (semi-bold)
opacity: 0.7 (when not selected)

/* Seçili Tarih Aralığı */
background: #dbeafe (light blue)
color: #1e40af (blue)
font-weight: bold

/* Başlangıç/Bitiş Tarihleri */
background: #3b82f6 (blue)
color: white
font-weight: bold
box-shadow: 0 0 0 2px #93c5fd
```

#### Legend (Gösterge)
- Takvim üstünde küçük bir legend kutusu
- Hafta sonlarını temsil eden kırmızımsı kutu
- İki dilde gösterim: "Paz/Cmt" (TR), "Sun/Sat" (EN)

#### İş Günü Hesaplama Göstergesi
Tarih seçimi sonrası gösterilen özet panelinde:
- **TR**: "(Hafta sonları hariç)"
- **EN**: "(Excluding weekends)"
- İtalik stil ile vurgulanır
- Font boyutu: 12px
- Renk: #6b7280 (gray)

### Akıllı Tarih Seçimi (v2.1.0)

#### Otomatik Focus
Kullanıcı deneyimini iyileştiren otomatik focus özelliği:

1. **Başlangıç tarihi seçimi**
   - Input'a tarih girilir
   - 100ms sonra bitiş tarihi input'una otomatik focus
   - Kullanıcı kesintisiz devam eder

2. **Implementation**
```typescript
setTimeout(() => {
  const allDateInputs = document.querySelectorAll('input[type="date"]');
  if (allDateInputs.length > 1) {
    (allDateInputs[1] as HTMLInputElement).focus();
  }
}, 100);
```

#### Dinamik Takvim Senkronizasyonu
Takvim seçilen tarihlere göre otomatik güncellenir:

1. **Başlangıç tarihi seçilince**
   - Takvim o ayın 1'ine ayarlanır
   - `setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1))`

2. **Bitiş tarihi seçilince**
   - Takvim bitiş tarihinin ayına geçer
   - Tarih aralığı takvimde görsel olarak vurgulanır

3. **useEffect ile senkronizasyon**
```typescript
useEffect(() => {
  if (startDate) {
    setCalendarMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
  }
}, [startDate, setCalendarMonth]);
```

### İş Günü Hesaplama
Otomatik olarak hafta sonlarını hariç tutar:

```typescript
const calculateBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++; // Pazar ve Cumartesi hariç
    current.setDate(current.getDate() + 1);
  }
  return count;
};
```

## 📎 Dosya Yönetimi

### Dosya Yükleme (v1.0.0)
Belirli izin türleri için dosya ekleme zorunluluğu:

#### Zorunlu Dosya Gerektiren İzin Türleri
- Hastalık İzni (sick)
- Mazeret İzni (personal)
- Ücretsiz İzin (unpaid)

#### Özellikleri
- Çoklu dosya desteği
- Desteklenen formatlar: PDF, DOC, DOCX, JPG, JPEG, PNG
- Dosya boyutu gösterimi (KB/MB)
- Ayrı ayrı silme özelliği

#### UI Bileşenleri
```tsx
<input
  type="file"
  multiple
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
/>
```

## 🌐 Dil Yönetimi

### Context API ile Dil Yönetimi (v2.0.0)

#### LanguageContext
Global dil durumu yönetimi:

```typescript
interface LanguageContextType {
  language: Language;      // 'tr' | 'en'
  setLanguage: (lang) => void;
  t: Translations;         // Mevcut dil çevirileri
}
```

#### Kullanım
```typescript
const { language, t } = useLanguage();

// Dil değiştirme
setLanguage('en');

// Çeviri kullanma
<h1>{t.pageTitle}</h1>
```

#### Desteklenen Diller
- 🇹🇷 Türkçe (tr)
- 🇬🇧 İngilizce (en)

## 🔔 Otomatik Yanıt

### Out of Office Mesajı (v1.0.0)

#### Özellikler
- Switch butonu ile aktif/pasif
- Çoklu satır textarea
- Placeholder örnek mesaj
- Zorunlu alan (aktif ise)

#### UI Elementi
Modern toggle switch:
- Aktif: Mavi (#3b82f6)
- Pasif: Gri (#d1d5db)
- Animasyonlu geçiş
- Touch-friendly

## 👥 Vekil Yönetimi

### Vekil Seçimi (v1.0.0)

#### Mock Data
```typescript
const MOCK_EMPLOYEES = [
  { id: '1', name: 'Ahmet Yılmaz', department: 'Yazılım Geliştirme' },
  { id: '2', name: 'Ayşe Demir', department: 'İnsan Kaynakları' },
  // ...
];
```

#### Dropdown Formatı
"İsim - Departman" formatında gösterim

## 📊 Özet Panel

### Sticky Summary Card (v1.0.0)

#### İçerik
- Tarih aralığı
- İzin türü
- Vekil bilgisi
- İş günü sayısı (büyük font)

#### Davranış
- Scroll sırasında sabit kalır (sticky)
- Gradient arka plan (mavi-mor)
- Beyaz metin
- Gerçek zamanlı güncelleme

#### Form Validasyonu
Gönder butonu sadece şu durumlarda aktif:
- ✅ Başlangıç tarihi seçili
- ✅ Bitiş tarihi seçili
- ✅ İzin türü seçili
- ✅ Vekil seçili
- ✅ Gerekli dosyalar yüklenmiş
- ✅ Otomatik yanıt mesajı (aktifse) girilmiş

## 🔄 Context API Mimarisi (v2.0.0)

### 3 Ana Context

#### 1. LanguageContext
- Dil yönetimi
- Çeviri sağlama
- Global erişim

#### 2. LeaveRequestContext
- Form state
- Tarih yönetimi
- Dosya yönetimi
- Takvim ayı state'i

#### 3. UIContext
- Modal durumları
- Loading durumları
- UI event'leri

### Provider Hiyerarşisi
```jsx
<LanguageProvider>
  <LeaveRequestProvider>
    <UIProvider>
      <App />
    </UIProvider>
  </LeaveRequestProvider>
</LanguageProvider>
```

## 📱 Responsive Tasarım

### Breakpoint'ler
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptif Özellikler
- Grid layout'u değişir (1 veya 2 sütun)
- Font boyutları ayarlanır
- Padding'ler optimize edilir
- Touch-friendly buton boyutları

## 🎨 Renk Paleti

### Primary Colors
- **Blue**: #3b82f6 (buttons, highlights)
- **Purple**: #9333ea (gradients)
- **Green**: #22c55e (success)
- **Red**: #dc2626 (weekends, delete)
- **Orange**: #f97316 (auto-reply icon)

### Background Colors
- **Light Blue**: #dbeafe (selected dates)
- **Light Red**: #fef2f2 (weekends)
- **Light Green**: #dcfce7 (success modal)
- **White**: #ffffff (cards)

### Text Colors
- **Dark Gray**: #1f2937 (headings)
- **Medium Gray**: #374151 (body text)
- **Light Gray**: #6b7280 (secondary text)

## 🚀 Performance

### Optimizasyonlar
- Context splitting (3 ayrı context)
- useMemo for computed values
- useCallback for handlers
- Conditional rendering
- Lazy loading (hazırda)

### Bundle Size
- **Main Bundle**: 68.27 kB (gzipped)
- **Dependencies**: React, TypeScript, Lucide React
- **No external state management library**

## 🔮 Gelecek Özellikler

### Öncelikli (v2.3.0)
- [ ] Geçmiş tarih seçimini engelleme
- [ ] Keyboard navigation (arrow keys)
- [ ] Kalan izin günü sayacı
- [ ] İzin geçmişi görüntüleme

### Orta Vadeli (v3.0.0)
- [ ] Backend API entegrasyonu
- [ ] Authentication
- [ ] Email bildirimleri
- [ ] Admin paneli
- [ ] Resmi tatil günleri

### Uzun Vadeli
- [ ] Dark mode
- [ ] PWA support
- [ ] Offline mode
- [ ] Calendar sync (Google/Outlook)
- [ ] Mobile app (React Native)
