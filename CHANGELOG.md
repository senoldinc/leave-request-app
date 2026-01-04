# 📝 Değişiklik Günlüğü (Changelog)

## [v2.5.1] - 2025-01-04

### 🐛 Bug Düzeltmeleri

#### Takvim Navigasyonu Bug Düzeltmesi
**Sorun:** Takvimde ay değiştirme butonuna tıklandığında otomatik bitiş tarihi picker'ı açılıyordu.

**Çözüm:** 
- Otomatik `showPicker()` özelliği tamamen kaldırıldı
- Kullanıcı kendi istediği zaman picker'ı açar
- Daha temiz ve öngörülebilir UX

### ✨ İyileştirmeler

#### Date Range Input Yeniden Tasarımı
- **Tek Label**: "Başlangıç Tarihi - Bitiş Tarihi" birleştirildi
- **Yan Yana Input**: İki tarih input'u yan yana
- **Focus Efekti**: Mavi border (2px) + hafif mavi shadow
- **Görsel Vurgu**: Font weight 500, kalın border
- **İpucu Mesajı**: 💡 "İpucu: Başlangıç tarihi seçtikten sonra bitiş tarihini seçin"
- **İki Dil**: TR/EN tam destek

**Faydaları:**
- ✅ Kullanıcı kontrolü
- ✅ Takvim navigasyonu sorunsuz
- ✅ Daha temiz kod
- ✅ Öngörülebilir davranış

---

## [v2.5.0] - 2025-01-04

### ✨ Yeni Özellikler

#### Tek Satır İzin Bakiyesi
- **Kompakt Header**: Başlık ve kalan gün aynı satırda
- **Sağa Yaslı Sayı**: Kalan gün sayısı sağ tarafta büyük font
- **Daha Az Yer**: Kapalı durumda tek satır

**Görünüm:**
```
🏆 İzin Bakiyesi              Kalan: 12 gün  ▼
```

#### Gelişmiş Takvim - Özel Günler

**Resmi Tatiller (2025):**
- Yılbaşı (1 Ocak)
- 23 Nisan Ulusal Egemenlik ve Çocuk Bayramı
- İşçi Bayramı (1 Mayıs)
- Gençlik ve Spor Bayramı (19 Mayıs)
- Demokrasi ve Milli Birlik Günü (15 Temmuz)
- Zafer Bayramı (30 Ağustos)
- Cumhuriyet Bayramı (29 Ekim)
- Ramazan Bayramı (30 Mart - 1 Nisan)
- Kurban Bayramı (6-9 Haziran)

**İzin Durumları:**
- ✅ Onaylanmış İzinler (yeşil, düz kenar)
- ⏳ Onay Bekleyen İzinler (mavi, kesikli kenar)

**Tooltip Sistemi:**
- Mouse hover ile detay gösterimi
- Resmi tatil adı (TR/EN)
- İzin durumu bilgisi
- Koyu gri arka plan, beyaz yazı
- Ok işareti ile bağlantı

#### Renk Paleti Sistemi

| Kategori | Arka Plan | Yazı | Kenar | Kullanım |
|----------|-----------|------|-------|----------|
| **Resmi Tatil** | `#fef3c7` (Açık sarı) | `#d97706` (Turuncu) | `#fbbf24` (Sarı) | Public holidays |
| **Onaylı İzin** | `#dcfce7` (Açık yeşil) | `#16a34a` (Yeşil) | `#22c55e` (Yeşil) | Approved leaves |
| **Onay Bekleyen** | `#e0e7ff` (Açık mavi) | `#4f46e5` (İndigo) | `#6366f1` (Kesikli) | Pending approval |
| **Hafta Sonu** | `#fef2f2` (Açık kırmızı) | `#dc2626` (Kırmızı) | - | Weekends |
| **Seçili Aralık** | `#dbeafe` (Açık mavi) | `#1e40af` (Mavi) | - | Selected range |
| **Başlangıç/Bitiş** | `#3b82f6` (Mavi) | `#ffffff` (Beyaz) | `#93c5fd` (Ring) | Start/End dates |

**Öncelik Sırası:**
1. Seçili tarih (başlangıç/bitiş)
2. Onaylı izin
3. Onay bekleyen izin
4. Resmi tatil
5. Hafta sonu

**Legend Kartı:**
- Takvim altında renk açıklaması
- 2 sütun grid layout
- Küçük renkli kutucuklar
- İki dilde açıklama

### 🎨 UI/UX İyileştirmeleri
- Tek satır header (space saving)
- Hover cursor: pointer (özel günler için)
- Tooltip animasyonu
- Renkli ve anlamlı gösterimler
- Legend ile kullanıcı dostu açıklama

### 📊 Mock Data Eklendi
- 14 resmi tatil (2025)
- 3 onaylanmış izin günü
- 2 onay bekleyen izin günü
- İki dilde tatil isimleri

---

## [v2.4.0] - 2025-01-04

### ✨ Yeni Özellikler

#### Collapsible İzin Bakiyesi Kartı
- **Kompakt Tasarım**: Kart varsayılan olarak kapalı gelir
- **Tek Tıkla Genişlet**: Tıklandığında tüm detaylar açılır
- **Kapalı Durum**: Sadece başlık ve kalan izin günü gösterilir
- **Açık Durum**: Tüm detaylar (progress bar, devreden izin, hak ediş vb.)
- **Konum**: Sol sütunda, formun en üstünde
- **Hover Efekti**: Tıklanabilir olduğu belli

**Kapalı Görünüm:**
```
┌───────────────────────────────┐
│ 🏆 İzin Bakiyesi         ▼   │
│    Kalan: 12 gün             │
└───────────────────────────────┘
```

**Açık Görünüm:**
```
┌───────────────────────────────┐
│ 🏆 İzin Bakiyesi         ▲   │
│    Kalan: 12 gün             │
├───────────────────────────────┤
│  [Büyük yeşil kart: 12 gün]  │
│  [Progress bar]              │
│  [Toplam, Devreden, Hak ediş] │
└───────────────────────────────┘
```

**UI/UX İyileştirmeleri:**
- ChevronDown/ChevronUp ikonları ile açık/kapalı durumu
- Hover efekti (açık gri arka plan)
- Smooth transition
- User-select: none (metin seçimi engellendi)
- Cursor: pointer (tıklanabilir göstergesi)

**Avantajları:**
- 📏 Daha az yer kaplar
- 👀 İhtiyaç olduğunda detaylar açılır
- 🎯 Odaklanma: Form daha görünür
- 📱 Mobil için ideal

---

## [v2.3.0] - 2025-01-04

### ✨ Yeni Özellikler

#### Otomatik Tarih Picker Açılması
- **Otomatik showPicker()**: Başlangıç tarihi seçildiğinde bitiş tarihi picker'ı otomatik açılır
- **Kesintisiz Deneyim**: Kullanıcı ekstra tıklama yapmadan direkt tarihi seçebilir
- **Browser Uyumluluğu**: showPicker() desteklemeyen tarayıcılarda sadece focus yapılır

**Teknik Detaylar:**
```typescript
endDateInput.showPicker(); // HTML5 native API
```

#### İzin Bakiyesi Kartı
Kullanıcılar artık izin durumlarını detaylı şekilde görebilir:

**Görünen Bilgiler:**
- **Kalan İzin**: Büyük, vurgulu gösterge (yeşil arka plan)
- **Progress Bar**: Kullanılan/kalan izin görsel oranı
- **Toplam İzin Hakkı**: Yıllık toplam izin günü
- **Devreden İzin**: Geçen yıldan kalan izin
- **Devir Tarihi**: İzin devredilme tarihi
- **Sonraki Hak Ediş**: Gelecek izin eklenmesi
- **Hak Ediş Tarihi**: Yeni izin eklenme tarihi
- **Hak Edilecek Gün**: Eklenecek izin miktarı

**UI Özellikleri:**
- Modern kart tasarımı
- İkonlarla görsel zenginlik (Calendar, Award, RotateCcw, TrendingUp)
- Renk kodlaması:
  - Yeşil: Kalan izin (başarı)
  - Turuncu: Kullanılan izin (uyarı)
  - Sarı: Devreden izin (bilgi)
  - Açık yeşil: Sonraki hak ediş (umut)
- Progress bar animasyonu
- Responsive tasarım
- İki dilde tam destek

**Bilgi Notu:**
- Alt kısımda kullanıcı bilgilendirmesi
- İzin politikası hakkında açıklama

### 🎨 UI/UX İyileştirmeleri
- İzin bakiyesi en üstte, kullanıcının ilk göreceği bilgi
- Büyük rakamlar ile kolay okunabilirlik
- Progress bar ile görsel feedback
- İkonlar ile anlaşılır kategorizasyon

### 🔧 Teknik İyileştirmeler
- `LeaveBalance` interface eklendi
- `MOCK_LEAVE_BALANCE` constant tanımlandı
- `LeaveBalanceCard` component oluşturuldu
- Translations genişletildi (leaveBalance section)

---

## [v2.2.0] - 2025-01-04

### ✨ Yeni Özellikler

#### Hafta Sonu Gösterimi
- **Görsel Ayrım**: Hafta sonları (Cumartesi/Pazar) takvimde kırmızı renkte gösteriliyor
- **Legend Eklendi**: Takvim üstünde hafta sonu gösterge kutusu
- **Renk Kodlama**:
  - Hafta içi: Normal beyaz arka plan
  - Hafta sonu: Açık kırmızı (#fef2f2) arka plan
  - Hafta sonu yazı rengi: Kırmızı (#dc2626)
  - Opacity: Hafta sonları %70 opaklık

**Görsel İyileştirmeler:**
- Hafta sonları kalın yazı tipi (font-weight: 600)
- Hafta içi günler normal yazı tipi
- Seçili tarihlerde hafta sonu rengi korunur
- Legend ile kullanıcı dostu açıklama

**İş Günü Açıklaması:**
- Tarih aralığı özeti altında "Hafta sonları hariç" notu eklendi
- İki dilde destek (TR/EN)
- İtalik stil ile vurgu

### 🎨 UI İyileştirmeleri
- Takvim üstünde mini legend eklendi
- Hafta sonu renkleri tutarlı ve görsel olarak ayırt edici
- Responsive tasarıma uyumlu

---

## [v2.1.0] - 2025-01-04

### ✨ Yeni Özellikler

#### Akıllı Tarih Seçimi
- **Otomatik Focus**: Başlangıç tarihi seçildiğinde bitiş tarihi input'una otomatik focus yapılır
- **Dinamik Takvim**: Seçilen tarihe göre sağdaki mini takvim otomatik olarak ilgili aya geçer
- **Senkronize Görünüm**: Tarih değişikliklerinde takvim ve form senkronize çalışır

**Teknik Detaylar:**
- `calendarMonth` state'i Context'e eklendi
- `useEffect` ile tarih değişikliklerinde takvim güncelleniyor
- 100ms setTimeout ile DOM güncellenmesi beklenip focus yapılıyor

**Kullanıcı Deneyimi İyileştirmeleri:**
- Kullanıcı başlangıç tarihi seçtikten sonra otomatik olarak bitiş tarihini girebilir
- Gelecek aylara izin girerken manuel ay değiştirme gereksiz
- Takvim ve form her zaman senkron

### 🔧 İyileştirmeler
- Takvim ay değiştirme butonlarına hover efekti eklendi
- Takvim başlığı font boyutu optimize edildi
- Kullanılmayan değişkenler temizlendi (ESLint uyarıları giderildi)

### 🐛 Düzeltmeler
- ESLint uyarıları temizlendi
- Gereksiz import'lar kaldırıldı

---

## [v2.0.0] - 2025-01-04

### 🚀 Büyük Güncelleme: Context API Entegrasyonu

#### Context API ile Global State Yönetimi
- **3 Adet Context Eklendi:**
  - `LanguageContext`: Dil yönetimi (TR/EN)
  - `LeaveRequestContext`: İzin talebi state yönetimi
  - `UIContext`: Modal ve loading durumları
  
- **Provider Pattern:**
  - `AppProviders` ile merkezi provider yönetimi
  - Hiyerarşik provider yapısı
  - Type-safe Context API'ler

#### Yeni Custom Hooks
- `useLanguage()`: Dil yönetimi hook
- `useLeaveRequestContext()`: İzin formu hook
- `useUI()`: UI durumları hook

#### Mimari İyileştirmeler
- Prop drilling problemi çözüldü
- Merkezi state yönetimi
- Daha temiz ve bakımı kolay kod
- Test edilebilir yapı

### 📚 Dokümantasyon
- **CONTEXT_API_GUIDE.md** eklendi
  - Detaylı kullanım örnekleri
  - Best practices
  - Performance ipuçları
  - Testing stratejileri

### 🏗️ Proje Yapısı
- `contexts/` klasörü eklendi
- `providers/` klasörü eklendi
- Component'ler Context kullanacak şekilde güncellendi

---

## [v1.0.0] - 2025-01-03

### 🎉 İlk Sürüm

#### Temel Özellikler
- **Çoklu Dil Desteği**: TR/EN
- **Dosya Yükleme**: Belirli izin türleri için zorunlu
- **Mini Takvim**: Görsel tarih seçimi
- **Otomatik Yanıt**: Out of office mesajı
- **İş Günü Hesaplama**: Otomatik hesaplama
- **Responsive Tasarım**: Mobil, tablet, desktop

#### Component Yapısı
- 7 ayrı kart bileşeni
- 2 ortak bileşen
- Modüler yapı

#### Teknik Stack
- React 18
- TypeScript
- Lucide React icons
- Create React App

---

## 🔮 Gelecek Planlar

### v2.2.0 (Planlanan)
- [ ] Hafta sonları ve resmi tatilleri takvimde gösterme
- [ ] Tarih aralığında toplam izin günü limiti kontrolü
- [ ] Kalan izin günü sayacı
- [ ] İzin geçmişi görüntüleme

### v3.0.0 (Planlanan)
- [ ] Backend API entegrasyonu
- [ ] Authentication sistemi
- [ ] Database bağlantısı
- [ ] Email notification sistemi
- [ ] Admin paneli

### Uzun Vadeli
- [ ] Dark mode
- [ ] PWA desteği
- [ ] Offline mode
- [ ] Push notifications
- [ ] Export to PDF
- [ ] Calendar integration (Google, Outlook)

---

## 📋 Versiyon Notasyonu

Bu proje [Semantic Versioning](https://semver.org/) kullanır:
- **Major (X.0.0)**: Geriye dönük uyumlu olmayan değişiklikler
- **Minor (0.X.0)**: Geriye dönük uyumlu yeni özellikler
- **Patch (0.0.X)**: Geriye dönük uyumlu hata düzeltmeleri

## 🔗 Linkler

- [README.md](./README.md) - Proje dokümantasyonu
- [CONTEXT_API_GUIDE.md](./CONTEXT_API_GUIDE.md) - Context API kılavuzu
- [GitHub Issues](https://github.com/yourusername/project/issues) - Hata bildirimleri
