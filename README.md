# AI Chatbot App 🤖

A modern React Native mobile application built with Expo that features user authentication and an AI-powered chatbot interface with Google Gemini integration. The app uses Zustand for state management, Expo SecureStore for secure token storage, and supports markdown rendering for rich text conversations.

![GitHub repo size](https://img.shields.io/github/repo-size/tungnq2606/AI-Chatbot)
![GitHub language count](https://img.shields.io/github/languages/count/tungnq2606/AI-Chatbot)
![GitHub top language](https://img.shields.io/github/languages/top/tungnq2606/AI-Chatbot)

## 🚀 Features

- 🔐 **User Authentication**: Complete sign-in/sign-up flow with secure token storage
- 🏠 **Home Dashboard**: Welcome screen with user information and app features
- 💬 **AI Chat Interface**: Modern chat UI with real-time Google Gemini AI responses
- 📝 **Markdown Support**: Rich text rendering for both user messages and AI responses
- 🤖 **Google Gemini Integration**: Powered by Google's advanced AI for intelligent conversations
- 📱 **Cross-Platform**: Native iOS and Android support via React Native
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth animations
- 🔒 **Secure Storage**: Uses Expo SecureStore for sensitive data protection
- ⚡ **Real-time Features**: Typing indicators and instant message delivery
- 🌓 **Theme Support**: Light mode with consistent color scheme

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript for type safety
- **State Management**: Zustand for global state
- **Navigation**: Expo Router (file-based routing)
- **Security**: Expo SecureStore for token storage
- **AI Integration**: Google Generative AI (Gemini)
- **Markdown**: react-native-markdown-display for rich text rendering
- **UI Components**: React Native core components with custom styling

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)
- Google AI API Key (for Gemini integration)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/tungnq2606/AI-Chatbot.git
cd AI-Chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Google AI API key:
```env
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

**Get your Google AI API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 4. Start the Development Server
```bash
npm start
```

### 5. Run on Device/Simulator
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal to run in browser

## 🔑 Authentication

### Demo Credentials
For testing purposes, use these credentials:
- **Email**: `demo@example.com`
- **Password**: `password`

### Authentication Flow
- **Loading State**: Shows loading spinner while checking authentication
- **Unauthenticated**: Redirects to sign-in screen
- **Authenticated**: Redirects to home dashboard

## 💬 Chat Features

The AI chatbot interface includes:

### Core Features
- **Real-time AI Responses**: Powered by Google Gemini AI
- **Markdown Support**: Rich text formatting for messages
- **Message Bubbles**: Custom styled bubbles for user and AI messages
- **Typing Indicators**: Shows when AI is generating responses
- **Timestamps**: Automatic timestamp display for all messages
- **Clear Chat**: Option to clear conversation history
- **Auto-scroll**: Automatically scrolls to newest messages

### Markdown Support
Users can send and receive messages with markdown formatting:
- **Bold text**: `**bold**` or `__bold__`
- **Italic text**: `*italic*` or `_italic_`
- **Inline code**: `` `code` ``
- **Code blocks**: ````code````
- **Headers**: `# H1`, `## H2`, `### H3`
- **Blockquotes**: `> quote`
- **Lists**: `- item` or `1. item`
- **Links**: `[text](url)`

### AI Capabilities
The Google Gemini integration provides:
- Natural language understanding
- Contextual responses
- Code assistance and explanations
- Creative writing support
- Question answering
- Multi-turn conversations

## 📱 App Structure

```
app/
├── _layout.tsx          # Root layout configuration
├── index.tsx           # Initial loading and routing
└── (auth)/
    ├── _layout.tsx     # Authentication layout
    ├── signin.tsx      # Sign in screen
    ├── signup.tsx      # Sign up screen
    ├── home.tsx        # Home dashboard
    └── chat.tsx        # AI chat interface

store/
├── authStore.ts        # Authentication state management
└── chatStore.ts        # Chat state with AI integration

components/
├── ThemedText.tsx      # Themed text component
├── ThemedView.tsx      # Themed view component
├── LoadingScreen.tsx   # Loading screen component
└── ErrorBoundary.tsx   # Error boundary component
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:
```env
# Google AI API Key (Required)
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your_api_key_here
```

### App Configuration
The app configuration is centralized in `constants/AppConfig.ts`:
- Authentication settings
- API endpoints
- UI color scheme
- Security settings

## 🛡 Security Features

- **Secure Token Storage**: Uses Expo SecureStore for authentication tokens
- **Environment Variables**: API keys stored securely in environment files
- **Form Validation**: Client-side validation for email and password fields
- **Password Requirements**: Minimum 6 characters for passwords
- **Automatic Token Validation**: Checks authentication status on app launch
- **API Key Protection**: Environment variables excluded from version control

## 🔄 Development Workflow

### Making Changes
1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly on both iOS and Android
4. Commit changes: `git commit -m "Add your feature"`
5. Push to GitHub: `git push origin feature/your-feature`
6. Create a Pull Request

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint for code quality
```

## 🚨 Troubleshooting

### Common Issues

**1. API Key Not Working**
- Ensure your Google AI API key is valid
- Check that the `.env` file is in the root directory
- Restart the development server after adding the API key

**2. Authentication Issues**
- Clear app data/cache
- Check SecureStore permissions
- Verify demo credentials are correct

**3. Build Issues**
- Clear Metro cache: `npx expo start --clear`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npx tsc --noEmit`

**4. Markdown Not Rendering**
- Ensure `react-native-markdown-display` is installed
- Check for syntax errors in markdown text
- Verify styles are applied correctly

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Add proper error handling
- Include comments for complex logic
- Test on both iOS and Android
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Google AI](https://ai.google.dev/) for Gemini API integration
- [React Native](https://reactnative.dev/) for cross-platform development
- [Zustand](https://docs.pmnd.rs/zustand) for state management
- [React Native Markdown Display](https://github.com/iamacup/react-native-markdown-display) for markdown rendering

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

**Built with ❤️ using React Native and Expo**
