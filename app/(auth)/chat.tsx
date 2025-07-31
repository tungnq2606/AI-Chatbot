import { AppConfig } from "@/constants/AppConfig";
import { Message, useChatStore } from "@/store/chatStore";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useSafeAreaInsets } from "react-native-safe-area-context";


// Markdown Text component for displaying messages
const MarkdownText = ({ children, style, isUser }: { children: string; style?: any; isUser?: boolean }) => {
  const markdownStyles = {
    body: {
      fontSize: 16,
      lineHeight: 20,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
      ...style,
    },
    code_inline: {
      fontFamily: 'Courier',
      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
      borderRadius: 4,
      paddingHorizontal: 4,
      paddingVertical: 2,
      fontSize: 14,
    },
    code_block: {
      fontFamily: 'Courier',
      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
      borderRadius: 8,
      padding: 12,
      marginVertical: 4,
      fontSize: 14,
    },
    fence: {
      fontFamily: 'Courier',
      backgroundColor: isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
      borderRadius: 8,
      padding: 12,
      marginVertical: 4,
      fontSize: 14,
    },
    blockquote: {
      borderLeftWidth: 4,
      borderLeftColor: isUser ? 'rgba(255,255,255,0.5)' : '#ddd',
      paddingLeft: 12,
      fontStyle: 'italic' as const,
      marginVertical: 4,
    },
    heading1: { 
      fontSize: 22, 
      fontWeight: 'bold' as const, 
      marginVertical: 8,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
    },
    heading2: { 
      fontSize: 20, 
      fontWeight: 'bold' as const, 
      marginVertical: 6,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
    },
    heading3: { 
      fontSize: 18, 
      fontWeight: 'bold' as const, 
      marginVertical: 4,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
    },
    strong: { 
      fontWeight: 'bold' as const,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
    },
    em: { 
      fontStyle: 'italic' as const,
      color: isUser ? '#fff' : AppConfig.COLORS.TEXT_PRIMARY,
    },
    link: {
      color: isUser ? '#87CEEB' : AppConfig.COLORS.PRIMARY,
    },
    list_item: {
      marginVertical: 2,
    },
    bullet_list: {
      marginVertical: 4,
    },
    ordered_list: {
      marginVertical: 4,
    },
  };

  return (
    <Markdown style={markdownStyles}>
      {children}
    </Markdown>
  );
};

const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.isUser;
  return (
    <View
      style={[
        styles.bubbleContainer,
        isUser ? styles.userBubbleContainer : styles.aiBubbleContainer,
      ]}
    >
      {!isUser && (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{message.user.avatar}</Text>
        </View>
      )}

      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}
      >
        <MarkdownText
          isUser={isUser}
          style={[
            styles.bubbleText,
            isUser ? styles.userBubbleText : styles.aiBubbleText,
          ]}
        >
          {message.text}
        </MarkdownText>
        <Text
          style={[
            styles.timeText,
            isUser ? styles.userTimeText : styles.aiTimeText,
          ]}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

const TypingIndicator = () => (
  <View style={[styles.bubbleContainer, styles.aiBubbleContainer]}>
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>🤖</Text>
    </View>
    <View style={[styles.bubble, styles.aiBubble]}>
      <View style={styles.typingContainer}>
        <View style={[styles.typingDot, { animationDelay: "0ms" }]} />
        <View style={[styles.typingDot, { animationDelay: "150ms" }]} />
        <View style={[styles.typingDot, { animationDelay: "300ms" }]} />
      </View>
      <Text style={[styles.timeText, styles.aiTimeText]}>Typing...</Text>
    </View>
  </View>
);

export default function Chat() {
  const router = useRouter();
  const { messages, isTyping, sendMessage, clearMessages } = useChatStore();
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const {top, bottom} = useSafeAreaInsets();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const messageText = inputText.trim();
    setInputText("");
    await sendMessage(messageText);
  };

  const handleClearMessages = () => {
    Alert.alert("Clear Chat", "Are you sure you want to clear all messages?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        style: "destructive",
        onPress: clearMessages,
      },
    ]);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <ChatBubble message={item} />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: top }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity
          onPress={handleClearMessages}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        {/* Input Area */}
        <View style={[styles.inputContainer, { paddingBottom: bottom }]}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message... (Markdown supported)"
            placeholderTextColor={AppConfig.COLORS.TEXT_SECONDARY}
            multiline
            maxLength={1000}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppConfig.COLORS.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppConfig.COLORS.CARD_BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.COLORS.BORDER,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: AppConfig.COLORS.PRIMARY,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppConfig.COLORS.TEXT_PRIMARY,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearButtonText: {
    fontSize: 16,
    color: AppConfig.COLORS.DANGER,
    fontWeight: "600",
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  bubbleContainer: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  userBubbleContainer: {
    justifyContent: "flex-end",
    paddingLeft: 50,
  },
  aiBubbleContainer: {
    justifyContent: "flex-start",
    paddingRight: 50,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppConfig.COLORS.BORDER,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 4,
  },
  avatarText: {
    fontSize: 16,
  },
  bubble: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minHeight: 40,
    justifyContent: "center",
  },
  userBubble: {
    backgroundColor: AppConfig.COLORS.PRIMARY,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: AppConfig.COLORS.CARD_BACKGROUND,
    borderWidth: 1,
    borderColor: AppConfig.COLORS.BORDER,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userBubbleText: {
    color: "#fff",
  },
  aiBubbleText: {
    color: AppConfig.COLORS.TEXT_PRIMARY,
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  userTimeText: {
    color: "#fff",
    textAlign: "right",
  },
  aiTimeText: {
    color: AppConfig.COLORS.TEXT_SECONDARY,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppConfig.COLORS.TEXT_SECONDARY,
    marginHorizontal: 2,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppConfig.COLORS.CARD_BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: AppConfig.COLORS.BORDER,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppConfig.COLORS.BORDER,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: AppConfig.COLORS.BACKGROUND,
    color: AppConfig.COLORS.TEXT_PRIMARY,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: AppConfig.COLORS.PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: AppConfig.COLORS.TEXT_SECONDARY,
    opacity: 0.5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
