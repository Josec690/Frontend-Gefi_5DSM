import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import stylesDefault, { makeStyles } from '../styles/EstiloLogin';
import { useAppTheme } from '../context/ThemeContext';
import Grafico from '../assets/Grafico2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;
  const senhaRef = useRef(null);

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle(themeName === 'dark' ? 'light-content' : 'dark-content');
  }, [themeName]);

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
  }, []);

  const handleLogin = async () => {
    setEmailErro('');
    setSenhaErro('');
    let hasError = false;

    if (!email.trim()) {
      setEmailErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }
    if (!senha.trim()) {
      setSenhaErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ width: '100%', alignItems: 'center', transform: [{ translateY }] }}>

            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.title}>Gefi</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>Que bom te ver por aqui!</Text>
            <Image source={Grafico} style={styles.image} />

            {/* EMAIL */}
            <View style={{ width: '100%', marginBottom: 15 }}>
              {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}

              <TextInput
                style={styles.inputEmail}
                placeholder=" E-mail"
                placeholderTextColor={colors.mutedText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* SENHA */}
            <View style={{ width: '100%', marginBottom: 15 }}>
              {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}

              <View style={{ position: 'relative' }}>
                <TextInput
                  ref={senhaRef}
                  style={[styles.inputSenha, { paddingRight: 45 }]}
                  placeholder=" Senha"
                  placeholderTextColor={colors.mutedText}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  editable={!loading}
                />

                {/* Botão para mostrar/ocultar senha */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 15,
                    top: '25%',
                    transform: [{ translateY: -12 }],
                    padding: 5,
                  }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* LINK */}
            <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
              <Text style={styles.forgotLink}>Esqueci minha senha?</Text>
            </TouchableOpacity>

            {/* BOTÃO LOGIN */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.5 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </TouchableOpacity>

            {/* LINK DE CADASTRO */}
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>

          </Animated.View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
