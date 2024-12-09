import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TestDriveContextType {
  isTestDriveModalOpen: boolean;
  openTestDriveModal: () => void;
  closeTestDriveModal: () => void;
}

const TestDriveContext = createContext<TestDriveContextType | undefined>(undefined);

export const TestDriveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);

  const openTestDriveModal = () => {
    setIsTestDriveModalOpen(true);
  };

  const closeTestDriveModal = () => {
    setIsTestDriveModalOpen(false);
  };

  return (
    <TestDriveContext.Provider value={{ 
      isTestDriveModalOpen, 
      openTestDriveModal, 
      closeTestDriveModal 
    }}>
      {children}
    </TestDriveContext.Provider>
  );
};

export const useTestDriveModal = () => {
  const context = useContext(TestDriveContext);
  if (context === undefined) {
    throw new Error('useTestDriveModal must be used within a TestDriveProvider');
  }
  return context;
};
