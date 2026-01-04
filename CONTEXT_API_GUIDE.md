# 🔄 Context API Entegrasyonu - Kullanım Kılavuzu

## 📋 Genel Bakış

Bu proje, global state yönetimi için **React Context API** kullanmaktadır. Redux yerine Context API tercih edildi çünkü:

- ✅ Daha hafif ve basit
- ✅ Ek bağımlılık gerektirmiyor
- ✅ Bu proje boyutu için yeterli
- ✅ React ile native entegrasyon
- ✅ TypeScript ile mükemmel uyum

## 🏗️ Mimari

### Context Yapısı

```
contexts/
├── LanguageContext.tsx      # Dil yönetimi
├── LeaveRequestContext.tsx  # İzin talebi state'i
├── UIContext.tsx            # UI state'leri (modal, loading)
└── index.ts                 # Merkezi export

providers/
└── AppProviders.tsx         # Tüm provider'ları birleştiren wrapper
```

## 📚 Context'ler

### 1️⃣ LanguageContext

Uygulama genelinde dil yönetimi sağlar.

**State:**
- `language`: Mevcut dil ('tr' | 'en')
- `t`: Mevcut dil için çeviriler

**Actions:**
- `setLanguage(lang)`: Dili değiştir

**Kullanım:**
```tsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <button onClick={() => setLanguage('en')}>
      {t.pageTitle}
    </button>
  );
}
```

### 2️⃣ LeaveRequestContext

İzin talebi formu için state yönetimi.

**State:**
- `leaveRequest`: İzin talebi verisi
- `selectedDates`: Seçilen tarih dizisi

**Actions:**
- `setLeaveRequest`: State'i güncelle
- `handleDateSelect`: Tarih seçimi
- `handleFileUpload`: Dosya yükleme
- `handleRemoveFile`: Dosya silme
- `resetLeaveRequest`: Formu sıfırla

**Kullanım:**
```tsx
import { useLeaveRequestContext } from '../contexts/LeaveRequestContext';

function DatePicker() {
  const { leaveRequest, handleDateSelect } = useLeaveRequestContext();
  
  return (
    <input
      type="date"
      value={leaveRequest.startDate?.toISOString().split('T')[0]}
      onChange={(e) => handleDateSelect(new Date(e.target.value), true)}
    />
  );
}
```

### 3️⃣ UIContext

UI durumlarını yönetir (modal, loading, vb.).

**State:**
- `showSuccessModal`: Başarı modalının görünürlüğü
- `isLoading`: Yükleme durumu

**Actions:**
- `openSuccessModal()`: Modalı aç
- `closeSuccessModal()`: Modalı kapat
- `setIsLoading(bool)`: Loading durumunu ayarla

**Kullanım:**
```tsx
import { useUI } from '../contexts/UIContext';

function SubmitButton() {
  const { isLoading, openSuccessModal } = useUI();
  
  const handleSubmit = async () => {
    // API çağrısı
    openSuccessModal();
  };
  
  return (
    <button disabled={isLoading} onClick={handleSubmit}>
      {isLoading ? 'Gönderiliyor...' : 'Gönder'}
    </button>
  );
}
```

## 🎯 Provider Hiyerarşisi

```tsx
<LanguageProvider>
  <LeaveRequestProvider>
    <UIProvider>
      <App />
    </UIProvider>
  </LeaveRequestProvider>
</LanguageProvider>
```

Bu sıralama önemlidir çünkü:
1. `LanguageProvider` en dışta - tüm uygulama erişebilir
2. `LeaveRequestProvider` içeride - dil ayarlarını kullanabilir
3. `UIProvider` en içte - diğer context'lere bağımlı olabilir

## 🔒 Type Safety

Her context için TypeScript interface'leri tanımlıdır:

```typescript
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}
```

Context kullanılmadan önce Provider kontrolü yapılır:

```typescript
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

## 📦 Yeni Context Ekleme

### 1. Context Oluşturma

```tsx
// contexts/NewContext.tsx
import { createContext, useContext, useState } from 'react';

interface NewContextType {
  value: string;
  setValue: (val: string) => void;
}

const NewContext = createContext<NewContextType | undefined>(undefined);

export const NewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState('');
  
  return (
    <NewContext.Provider value={{ value, setValue }}>
      {children}
    </NewContext.Provider>
  );
};

export const useNew = () => {
  const context = useContext(NewContext);
  if (!context) throw new Error('useNew must be used within NewProvider');
  return context;
};
```

### 2. Provider'a Ekleme

```tsx
// providers/AppProviders.tsx
import { NewProvider } from '../contexts/NewContext';

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LeaveRequestProvider>
        <UIProvider>
          <NewProvider>  {/* Yeni provider */}
            {children}
          </NewProvider>
        </UIProvider>
      </LeaveRequestProvider>
    </LanguageProvider>
  );
};
```

### 3. Export Ekleme

```tsx
// contexts/index.ts
export { NewProvider, useNew } from './NewContext';
```

## 🎨 Best Practices

### ✅ DO (Yapılması Gerekenler)

1. **Her zaman custom hook kullan**
   ```tsx
   const { language } = useLanguage(); // ✅ Doğru
   ```

2. **Context'i sadece gerektiğinde kullan**
   - Global state için: Context API
   - Local state için: useState

3. **Provider'ları mantıksal sırayla yerleştir**
   - Bağımlılıkları dikkate al

4. **Type safety sağla**
   - Her context için interface tanımla
   - undefined kontrolleri yap

5. **Anlamlı isimler kullan**
   ```tsx
   const { t } = useLanguage();  // ✅ translations için t
   ```

### ❌ DON'T (Yapılmaması Gerekenler)

1. **Context'i doğrudan kullanma**
   ```tsx
   const context = useContext(LanguageContext); // ❌ Yanlış
   ```

2. **Çok fazla context oluşturma**
   - İlişkili state'leri birleştir

3. **Provider olmadan hook kullanma**
   - Test ortamında da Provider ekle

4. **Gereksiz re-render'lara neden olma**
   - Context'i küçük parçalara böl
   - useMemo/useCallback kullan

## 🧪 Testing

Context'leri test ederken provider wrapper kullan:

```tsx
import { render } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';

const wrapper = ({ children }) => (
  <LanguageProvider>
    {children}
  </LanguageProvider>
);

test('component with context', () => {
  render(<MyComponent />, { wrapper });
  // test logic
});
```

## 🚀 Performance İpuçları

### 1. Context'i Böl
Sık değişen ve nadir değişen state'leri ayır:

```tsx
// ❌ Kötü - Her state değişikliğinde tüm consumers re-render olur
const AppContext = { user, theme, notifications, ... }

// ✅ İyi - Ayrı context'ler
const UserContext = { user }
const ThemeContext = { theme }
const NotificationContext = { notifications }
```

### 2. Memoization Kullan

```tsx
const value = useMemo(
  () => ({ language, setLanguage, t }),
  [language, t]
);
```

### 3. Selector Pattern (İleri Düzey)

```tsx
// Sadece ihtiyacınız olan veriyi seçin
const language = useLanguage().language; // Sadece language
```

## 📊 Context vs Props vs Redux

| Özellik | Props | Context API | Redux |
|---------|-------|-------------|-------|
| Basitlik | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Prop Drilling | ❌ | ✅ | ✅ |
| DevTools | ❌ | ⚠️ | ✅ |
| Middleware | ❌ | ❌ | ✅ |
| Öğrenme Eğrisi | Düşük | Orta | Yüksek |
| Performans | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Bu Projede Neden Context API?**
- Orta ölçekli uygulama
- 3 basit context yeterli
- Ekstra bağımlılık gereksiz
- Öğrenmesi kolay

## 🔗 İlgili Dosyalar

- `src/contexts/` - Context tanımları
- `src/providers/AppProviders.tsx` - Provider wrapper
- `src/pages/LeaveRequestPage.tsx` - Context kullanım örneği
- `src/hooks/useLeaveRequest.ts` - Eski hook (artık context'te)

## 📖 Ek Kaynaklar

- [React Context API Docs](https://react.dev/learn/passing-data-deeply-with-context)
- [When to use Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [TypeScript with React Context](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)

---

**Not:** Context API büyük uygulamalar için Redux kadar güçlü olmayabilir, ancak bu proje boyutu için ideal bir çözümdür.
