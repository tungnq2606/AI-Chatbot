import { AppConfig } from '@/constants/AppConfig';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

// Mock AI responses for demo purposes
const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    // Initialize Google AI with your API key
    const genAI = new GoogleGenerativeAI(AppConfig.GOOGLE_AI_API_KEY);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Generate content based on user message
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error getting AI response:', error);
    
    // Fallback to simple responses if AI fails
    const fallbackResponses = [
      "I'm having trouble connecting to AI services right now. Please try again later.",
      "Sorry, I'm experiencing some technical difficulties. Can you rephrase your question?",
      "I'm currently unable to process your request. Please try again in a moment.",
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
      isUser: false,
      user: {
        id: 'ai',
        name: 'AI Assistant',
        avatar: '🤖',
      },
    },
  ],
  isTyping: false,

  sendMessage: async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString() + Math.random().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
      user: {
        id: 'user',
        name: 'You',
      },
    };

    // Add user message
    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
    }));

    try {
      // Get AI response
      const aiResponseText = await getAIResponse(text);
      
      const aiMessage: Message = {
        id: Date.now().toString() + Math.random().toString(),
        text: aiResponseText,
        timestamp: new Date(),
        isUser: false,
        user: {
          id: 'ai',
          name: 'AI Assistant',
          avatar: '🤖',
        },
      };

      // Add AI response
      set((state) => ({
        messages: [...state.messages, aiMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString() + Math.random().toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date(),
        isUser: false,
        user: {
          id: 'ai',
          name: 'AI Assistant',
          avatar: '🤖',
        },
      };

      set((state) => ({
        messages: [...state.messages, errorMessage],
        isTyping: false,
      }));
    }
  },

  clearMessages: () => {
    set({
      messages: [
        {
          id: '1',
          text: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date(),
          isUser: false,
          user: {
            id: 'ai',
            name: 'AI Assistant',
            avatar: '🤖',
          },
        },
      ],
      isTyping: false,
    });
  },
}));
