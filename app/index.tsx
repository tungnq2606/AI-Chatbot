import LoadingScreen from '@/components/LoadingScreen';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function Index() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(auth)/home');
      } else {
        router.replace('/(auth)/signin');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return <LoadingScreen message="Initializing..." />;
}
