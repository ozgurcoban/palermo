// Language switch utilities

export function setLanguageSwitchFlag() {
  // Use sessionStorage as primary method - more reliable than cookies
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('langSwitch', 'true');
      // Also set cookie as fallback for server-side
      document.cookie = "langSwitch=true; path=/; max-age=5; SameSite=Lax";
      return true;
    } catch (e) {
      console.error('Failed to set language switch flag:', e);
      return false;
    }
  }
  return false;
}