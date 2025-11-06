import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/EstiloLogin';
import Grafico from '../assets/Grafico2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Importa o serviço

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;

  const senhaRef = useRef(null);

  useEffect(() => {
    StatusBar.setBackgroundColor('#000');
    StatusBar.setBarStyle('light-content');
  }, []);

  // leve animação opcional (só pra dar "suavidade")
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates?.height || 300;
      const moveAmount = Math.min(keyboardHeight / 4, 90);
      Animated.timing(translateY, {
        toValue: -moveAmount,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [translateY]);

  const handleLogin = async () => {
    setEmailErro('');
    setSenhaErro('');
    let hasError = false;
    if (!email.trim()) { setEmailErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!senha.trim()) { setSenhaErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (hasError) return;

    setLoading(true);
    try {
      const response = await api.post('/login', {
        email: email.trim().toLowerCase(),
        senha,
      });
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.usuario));
      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
      navigation.navigate('Usuario');
    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Email ou senha incorretos');
      } else if (error.request) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      } else {
        Alert.alert('Erro', 'Erro ao processar login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Aqui você pode navegar para uma tela de recuperação
    // Exemplo: navigation.navigate('RecuperarSenha');
    Alert.alert(
      'Recuperar senha',
      'Função em desenvolvimento.\nEm breve você poderá redefinir sua senha.'
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'android' ? 120 : 60} // ajusta quanto rola acima do input
          keyboardOpeningTime={0}
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#000',
          }}
          showsVerticalScrollIndicator={false}
          resetScrollToCoords={{ x: 0, y: 0 }} // garante voltar ao topo/centro quando teclado fecha
        >
          <Animated.View
            style={{
              width: '100%',
              alignItems: 'center',
              transform: [{ translateY }],
            }}
          >
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <View style={styles.header}>
              <Text style={styles.title}>Gefi</Text>
            </View>

            <Text style={styles.text}>Que bom te ver por aqui!</Text>
            <Image source={Grafico} style={styles.image} />

            <View style={{ width: '100%', marginBottom: 15 }}>
              {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
              <TextInput
                style={styles.inputEmail}
                placeholder=" E-mail"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <View style={{ width: '100%', marginBottom: 15 }}>
              {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}
              <TextInput
                ref={senhaRef}
                style={styles.inputSenha}
                placeholder=" Senha"
                placeholderTextColor="#ccc"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                editable={!loading}
              />
            </View>

      {/* 🔗 Link de esqueci minha senha */}
      <TouchableOpacity onPress={handleForgotPassword} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
        <Text style={{ color: '#00BFFF', fontSize: 14 }}>Esqueci minha senha?</Text>
      </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.5 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkText}>
                Ainda não tem uma conta? Cadastre-se
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
