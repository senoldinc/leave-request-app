import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  showSuccessModal: boolean;
  isLoading: boolean;
  setShowSuccessModal: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openSuccessModal = () => setShowSuccessModal(true);
  const closeSuccessModal = () => setShowSuccessModal(false);

  const value: UIContextType = {
    showSuccessModal,
    isLoading,
    setShowSuccessModal,
    setIsLoading,
    openSuccessModal,
    closeSuccessModal,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
