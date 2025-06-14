"use client";

import { useEffect } from "react";

export function LanguageSwitchChecker() {
  useEffect(() => {
    // Check if we have language switch flag in sessionStorage
    const isLanguageSwitching = sessionStorage.getItem('langSwitch') === 'true';
    
    if (isLanguageSwitching) {
      // Add no-animations class immediately
      document.documentElement.classList.add('no-animations');
      
      // Clean up any leftover scroll data from previous attempts
      sessionStorage.removeItem('scrollPosition');
      sessionStorage.removeItem('scrollPercentage');
      sessionStorage.removeItem('docHeight');
      
      // Keep the flag and no-animations class active for the entire page session
      // They will only be cleared on the next non-language-switch page load
    } else {
      // This is a normal page load (not a language switch)
      // Clear the flag and ensure no-animations class is removed
      sessionStorage.removeItem('langSwitch');
      document.documentElement.classList.remove('no-animations');
    }
  }, []);
  
  return null;
}

// Export a hook to check if we're in a language switch
export function useIsLanguageSwitching() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('langSwitch') === 'true';
  }
  return false;
}