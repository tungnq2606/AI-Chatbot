export const AppConfig = {
  // Authentication
  DEMO_EMAIL: 'demo@example.com',
  DEMO_PASSWORD: 'password',
  MIN_PASSWORD_LENGTH: 6,
  
  // Storage Keys
  USER_TOKEN_KEY: 'user_token',
  USER_DATA_KEY: 'user_data',
  
  // API (when you integrate real backend)
  API_BASE_URL: 'https://your-api-url.com',
  
  // AI Configuration
  GOOGLE_AI_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || 'YOUR_GOOGLE_AI_API_KEY_HERE', // Replace with your actual API key
  
  // UI
  COLORS: {
    PRIMARY: '#007AFF',
    DANGER: '#FF3B30',
    BACKGROUND: '#f5f5f5',
    CARD_BACKGROUND: '#fff',
    TEXT_PRIMARY: '#333',
    TEXT_SECONDARY: '#666',
    BORDER: '#e0e0e0',
  },
};
