# AI Chatbot App 🤖

A React Native mobile application built with Expo that features user authentication and an AI chatbot interface. The app uses Zustand for state management and Expo SecureStore for secure token storage.

## Features

- 🔐 **User Authentication**: Complete sign-in/sign-up flow with secure token storage
- 🏠 **Home Screen**: Welcome dashboard with user information
- 💬 **Chat Interface**: Modern chat UI powered by react-native-gifted-chat
- 🤖 **AI Chatbot Integration**: Mock AI responses with keyword recognition
- 📱 **Mobile Optimized**: Native iOS and Android support
- 🎨 **Modern UI**: Clean and intuitive user interface
- 🔒 **Secure Storage**: Uses Expo SecureStore for sensitive data

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Zustand** - State management
- **Expo Router** - File-based routing
- **Expo SecureStore** - Secure token storage
- **React Native Gifted Chat** - Feature-rich chat interface

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on device/simulator**
   - Scan QR code with Expo Go (Android/iOS)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## Authentication Flow

### Demo Credentials
For testing purposes, use these credentials:
- **Email**: `demo@example.com`
- **Password**: `password`

### Authentication States
- **Loading**: Shows loading spinner while checking authentication status
- **Unauthenticated**: Redirects to sign-in screen
- **Authenticated**: Redirects to home screen

### Screens
- **Sign In** (`/signin`): Login with email and password
- **Sign Up** (`/signup`): Create new account
- **Home** (`/home`): Welcome screen for authenticated users
- **Chat** (`/chat`): AI chatbot interface with Gifted Chat

## Chat Features

The chat interface includes:
- **Message Bubbles**: Custom styled bubbles for user and AI messages
- **Typing Indicator**: Shows when AI is generating a response
- **Timestamps**: Automatic timestamp display
- **Clear Chat**: Option to clear conversation history
- **Keyword Recognition**: Demo AI responses based on message content
- **Avatar Support**: AI assistant displays with emoji avatar
- **Smooth Animations**: Powered by react-native-gifted-chat

### Sample AI Interactions
- Say "hello" or "hi" for a greeting
- Ask for "help" to get assistance information
- Mention "weather" for weather-related responses
- Ask about "time" to get current time
- Say "thank you" for appreciation responses
- Say "bye" or "goodbye" for farewell messages

## State Management

The app uses Zustand for global state management with the following store:

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}
```

## Project Structure

```
app/
├── _layout.tsx          # Root layout
├── index.tsx           # Initial loading/routing screen
└── (auth)/
    ├── _layout.tsx     # Auth layout
    ├── signin.tsx      # Sign in screen
    ├── signup.tsx      # Sign up screen
    ├── home.tsx        # Home screen (authenticated)
    └── chat.tsx        # Chat screen with Gifted Chat

store/
├── authStore.ts        # Zustand authentication store
└── chatStore.ts        # Zustand chat store with IMessage format

components/
├── ThemedText.tsx      # Themed text component
├── ThemedView.tsx      # Themed view component
├── ExternalLink.tsx    # External link component
├── LoadingScreen.tsx   # Loading screen component
└── ErrorBoundary.tsx   # Error boundary component
```

## Security Features

- **Secure Token Storage**: Uses Expo SecureStore for storing authentication tokens
- **Form Validation**: Client-side validation for email and password fields
- **Password Requirements**: Minimum 6 characters for passwords
- **Automatic Token Checking**: Checks authentication status on app launch

## Customization

### Adding Real Authentication
Replace the mock authentication in `store/authStore.ts` with your actual API calls:

```typescript
login: async (email: string, password: string) => {
  // Replace with actual API call
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (response.ok) {
    const { token, user } = await response.json();
    await SecureStore.setItemAsync('user_token', token);
    await SecureStore.setItemAsync('user_data', JSON.stringify(user));
    // ... update state
  }
}
```

### Adding Real AI Integration
Replace the mock AI responses in `store/chatStore.ts` with your actual AI service:

```typescript
const getAIResponse = async (userMessage: string): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  });
  
  const data = await response.json();
  return data.response;
};
```

### Customizing Chat Appearance
The chat interface can be customized by modifying the render functions in `app/(auth)/chat.tsx`:

- **renderBubble**: Customize message bubble appearance
- **renderSend**: Customize send button
- **renderSystemMessage**: Customize system messages
- **textInputStyle**: Customize input field styling

### Styling
The app uses a consistent color scheme and styling. Main colors:
- **Primary**: `#007AFF` (iOS Blue)
- **Danger**: `#FF3B30` (iOS Red)
- **Background**: `#f5f5f5`
- **Card Background**: `#fff`

## Development

- **Hot Reload**: Changes are reflected immediately during development
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with Expo's configuration

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
