"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  timestamp?: number;
}

interface ConsentContextType {
  consent: ConsentState;
  updateConsent: (newConsent: Partial<ConsentState>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  hasConsented: boolean;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'cookie-consent';

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
  });
  const [hasConsented, setHasConsented] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (storedConsent) {
        const parsedConsent = JSON.parse(storedConsent);
        setConsent(parsedConsent);
        setHasConsented(true);
      }
    } catch (error) {
      console.error('[Consent] Error loading consent:', error);
    }
  }, []);

  const updateConsent = (newConsent: Partial<ConsentState>) => {
    const updatedConsent = {
      ...consent,
      ...newConsent,
      timestamp: Date.now(),
    };
    
    setConsent(updatedConsent);
    setHasConsented(true);
    
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updatedConsent));
      
      // Update gtag consent if available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: updatedConsent.analytics ? 'granted' : 'denied'
        });
      }
      
      // Dispatch event for backward compatibility
      window.dispatchEvent(new Event('cookie-consent-updated'));
    } catch (error) {
      console.error('[Consent] Error saving consent:', error);
    }
  };

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
    });
  };

  const rejectAll = () => {
    updateConsent({
      necessary: true,
      analytics: false,
    });
  };

  return (
    <ConsentContext.Provider value={{
      consent,
      updateConsent,
      acceptAll,
      rejectAll,
      hasConsented,
    }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

// Optional: Hook that doesn't throw error, for components that might be outside provider
export function useConsentSafe() {
  const context = useContext(ConsentContext);
  return context;
}