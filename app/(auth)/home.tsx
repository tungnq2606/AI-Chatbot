import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Home() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/signin');
          },
        },
      ]
    );
  };

  const handleStartChat = () => {
    router.push('/(auth)/chat');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Hello {user?.name || 'User'}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
          
          <Text style={styles.infoLabel}>User ID:</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>AI Chatbot Features</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>💬 Chat with AI Assistant</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>🤖 Natural Language Processing</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>🔍 Smart Responses</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>📱 Mobile Optimized</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
          <Text style={styles.chatButtonText}>Start Chatting</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  userInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  features: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureItem: {
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
  },
  chatButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
