"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RecaptchaPreloadContextType {
  shouldLoadRecaptcha: boolean;
  triggerRecaptchaLoad: () => void;
  isRecaptchaLoading: boolean;
  setIsRecaptchaLoading: (loading: boolean) => void;
}

const RecaptchaPreloadContext = createContext<RecaptchaPreloadContextType | undefined>(undefined);

export function RecaptchaPreloadProvider({ children }: { children: ReactNode }) {
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);

  const triggerRecaptchaLoad = () => {
    if (!shouldLoadRecaptcha && !isRecaptchaLoading) {
      setShouldLoadRecaptcha(true);
      setIsRecaptchaLoading(true);
    }
  };

  return (
    <RecaptchaPreloadContext.Provider
      value={{
        shouldLoadRecaptcha,
        triggerRecaptchaLoad,
        isRecaptchaLoading,
        setIsRecaptchaLoading,
      }}
    >
      {children}
    </RecaptchaPreloadContext.Provider>
  );
}

export function useRecaptchaPreload() {
  const context = useContext(RecaptchaPreloadContext);
  if (context === undefined) {
    throw new Error("useRecaptchaPreload must be used within a RecaptchaPreloadProvider");
  }
  return context;
}