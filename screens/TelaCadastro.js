import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/EstiloCadastro';
import Grafico from '../assets/Grafico.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Importa o serviço

const { height } = Dimensions.get('window');

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [nomeErro, setNomeErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [cpfErro, setCpfErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBackgroundColor('#000');
    StatusBar.setBarStyle('light-content');
  }, []);

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
    if (!nome.trim()) { setNomeErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!email.trim()) { setEmailErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!cpf.trim()) { setCpfErro('Esse campo precisa ser preenchido!'); hasError = true; }
    if (!senha.trim()) { setSenhaErro('Esse campo precisa ser preenchido!'); hasError = true; }

    if (hasError) return;

    setLoading(true);
    try {
      const response = await api.post('/cadastro', {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        cpf: cpf.trim(),
        senha,
      });

      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('usuario_id', response.data.usuario_id);

      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      navigation.navigate('TelaPerguntas');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Erro ao cadastrar');
      } else if (error.request) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        Alert.alert('Erro', 'Erro ao processar cadastro');
      }
    } finally {
      setLoading(false);
    }
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
          extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: height,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#000',
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
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            <View style={styles.header}>
              <Text style={styles.title}>Gefi</Text>
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
                placeholderTextColor="#ccc"
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
                placeholderTextColor="#ccc"
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
                placeholderTextColor="#ccc"
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
              <TextInput
                ref={senhaRef}
                style={styles.input}
                placeholder=" Senha"
                placeholderTextColor="#ccc"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleCadastro}
                editable={!loading}
              />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
