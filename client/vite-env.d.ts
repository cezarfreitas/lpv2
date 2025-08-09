/// <reference types="vite/client" />

// Extend Window interface for analytics
declare global {
  interface Window {
    formStartTime?: number;
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
    _fbq?: any;
  }
}

export {};
