import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// URL do backend baseada no ambiente (Expo, emulador, dispositivo físico, web)
const getBaseURL = () => {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  const hostFromExpo = Constants.expoConfig?.hostUri?.split(':')?.[0]
    || Constants.manifest?.debuggerHost?.split(':')?.[0];
  if (hostFromExpo) return `http://${hostFromExpo}:5000/api`;

  if (Platform.OS === 'android') return 'http://10.0.2.2:5000/api';
  // iOS Simulator / Web fallback
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao buscar token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // Aqui você pode redirecionar para a tela de login
    }
    return Promise.reject(error);
  }
);

export default api;
