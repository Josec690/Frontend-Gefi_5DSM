import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesDefault, { makeStyles } from '../styles/EstiloCadastro';
import { useAppTheme } from '../context/ThemeContext';
import Grafico from '../assets/Grafico.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Ionicons } from '@expo/vector-icons';


const { height } = Dimensions.get('window');

export default function TelaCadastro({ navigation }) {
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const [nomeErro, setNomeErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [cpfErro, setCpfErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);

  const translateY = useRef(new Animated.Value(0)).current;

  const showFeedback = (title, message) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    Alert.alert(title, message);
  };

  const validarEmailLocal = (valor) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(valor.trim().toLowerCase());
  };

  const validarCpfLocal = (valor) => {
    const apenasDigitos = valor.replace(/\D/g, '');
    return apenasDigitos.length === 11;
  };

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle(themeName === 'dark' ? 'light-content' : 'dark-content');
  }, [themeName]);

  // animação leve quando o teclado abre
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

  const handleCadastro = async () => {
    setNomeErro('');
    setEmailErro('');
    setCpfErro('');
    setSenhaErro('');

    let hasError = false;
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const cpfLimpo = cpf.trim();
    const senhaLimpa = senha.trim();

    if (!nomeLimpo) { setNomeErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!emailLimpo) { setEmailErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!cpfLimpo) { setCpfErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!senhaLimpa) { setSenhaErro('Esse campo precisa ser preenchido!'); hasError = true; }

    if (!hasError && !validarEmailLocal(emailLimpo)) {
      setEmailErro('Digite um email válido.');
      hasError = true;
    }

    if (!hasError && !validarCpfLocal(cpfLimpo)) {
      setCpfErro('Digite um CPF válido com 11 números.');
      hasError = true;
    }

    if (!hasError && senhaLimpa.length < 6) {
      setSenhaErro('A senha deve ter no mínimo 6 caracteres.');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response = await api.post('/cadastro', {
        nome: nomeLimpo,
        email: emailLimpo,
        cpf: cpfLimpo,
        senha: senhaLimpa,
      });

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('usuario_id', response.data.usuario_id);

      showFeedback('Sucesso!', 'Cadastro realizado com sucesso!');
      navigation.navigate('TelaPerguntas');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response) {
        showFeedback('Erro', error.response.data.erro || 'Erro ao cadastrar');
      } else if (error.request) {
        showFeedback('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        showFeedback('Erro', 'Erro ao processar cadastro');
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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
        keyboardOpeningTime={0}
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
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
        <Animated.View
          style={{
            width: '100%',
            alignItems: 'center',
            transform: [{ translateY }],
          }}
        >
            <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('Intro')} accessibilityRole="button">
                <Text style={styles.title}>Gefi</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>
              Bem-vindo ao começo de uma vida financeira saudável
            </Text>

            <Image source={Grafico} style={styles.image} />

            {/* NOME */}
            <View style={{ width: '100%', marginBottom: 15 }}>
              {nomeErro ? <Text style={styles.errorText}>{nomeErro}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder=" Nome"
                placeholderTextColor={colors.mutedText}
                value={nome}
                onChangeText={setNome}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                blurOnSubmit={false}
                editable={!loading}
              />
            </View>

            {/* EMAIL */}
            <View style={{ width: '100%', marginBottom: 15 }}>
              {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder=" E-mail"
                placeholderTextColor={colors.mutedText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => cpfRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            {/* CPF */}
            <View style={{ width: '100%', marginBottom: 15 }}>
              {cpfErro ? <Text style={styles.errorText}>{cpfErro}</Text> : null}
              <TextInput
                ref={cpfRef}
                style={styles.input}
                placeholder=" CPF"
                placeholderTextColor={colors.mutedText}
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
                blurOnSubmit={false}
                editable={!loading}
              />
            </View>

          {/* SENHA */}
<View style={{ width: '100%', marginBottom: 15 }}>
  {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}

  <View style={{ position: 'relative' }}>
    <TextInput
      ref={senhaRef}
      style={[styles.input, { paddingRight: 45 }]} // espaço para o ícone
      placeholder=" Senha"
      placeholderTextColor={colors.mutedText}
      value={senha}
      onChangeText={setSenha}
      secureTextEntry={!showPassword}
      returnKeyType="done"
      onSubmitEditing={handleCadastro}
      editable={!loading}
    />

    {/* BOTÃO DE MOSTRAR/OCULTAR */}
    <TouchableOpacity
      onPress={() => setShowPassword((prev) => !prev)}
      style={{
        position: 'absolute',
        right: 15,
        top: '30%',
        transform: [{ translateY: -12 }],
        padding: 5,
      }}
    >
      <Ionicons
        name={showPassword ? "eye-off-outline" : "eye-outline"}
        size={22}
        color={colors.text}
      />
    </TouchableOpacity>
  </View>
</View>


            {/* BOTÃO */}
            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.5 }]}
              onPress={handleCadastro}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
        </Animated.View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
}
