/**
 * RiskShield AI - Global Configuration & Constants
 * Intelligent Payment Risk & Fraud Decisioning Platform
 */

const CONFIG = {
  APP_NAME: 'RiskShield AI',
  TAGLINE: 'Detect Fraud. Understand Risk. Protect Every Payment.',
  VERSION: '3.4.1-enterprise',
  
  // Centralized API Base URL for Spring Boot Backend
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : '/api',

  // Feature Flags
  USE_MOCK_FALLBACK: true, // Gracefully falls back to structured mock data if Spring Boot backend is offline
  DEBUG_MODE: true,

  // Risk Score Ranges
  RISK_LEVELS: {
    LOW: { min: 0, max: 29, label: 'LOW RISK', decision: 'APPROVE', color: '#00E699' },
    MEDIUM: { min: 30, max: 59, label: 'MEDIUM RISK', decision: 'MONITOR', color: '#FFB800' },
    HIGH: { min: 60, max: 79, label: 'HIGH RISK', decision: 'REVIEW', color: '#FF6B00' },
    CRITICAL: { min: 80, max: 100, label: 'CRITICAL RISK', decision: 'BLOCK', color: '#FF2E4D' }
  },

  // Auth Storage Keys
  STORAGE_KEYS: {
    JWT_TOKEN: 'riskshield_jwt_token',
    USER_PROFILE: 'riskshield_user_profile',
    SESSION_EXPIRY: 'riskshield_session_expiry'
  },

  // Sample Currency & Locale
  CURRENCY_SYMBOL: '₹',
  LOCALE: 'en-IN'
};

// Export to window
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
