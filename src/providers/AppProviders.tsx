import React, { ReactNode } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { LeaveRequestProvider } from '../contexts/LeaveRequestContext';
import { UIProvider } from '../contexts/UIContext';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders - Tüm context provider'ları tek bir bileşende toplar
 * Bu sayede App.tsx daha temiz kalır ve provider'lar merkezi olarak yönetilir
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LeaveRequestProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </LeaveRequestProvider>
    </LanguageProvider>
  );
};
